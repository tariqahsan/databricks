package mil.disa.oe.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.support.DefaultTransactionStatus;

import javax.sql.DataSource;

/**
 * Replaces Spring's DataSourceTransactionManager with a Hive-compatible version
 * when running against the local Spark Thrift Server (thrift profile).
 *
 * WHY THIS IS NEEDED:
 * Hive/Spark Thrift Server does not support JDBC transactions.
 * Spring's @Transactional annotations cause commit() and rollback() to be
 * called on HiveConnection, both of which throw:
 *   SQLFeatureNotSupportedException: Method not supported
 *
 * WHY doBegin IS NOT OVERRIDDEN:
 * doBegin() must run normally — it sets up the ConnectionHolder that binds
 * the JDBC connection to the current transaction context. JdbcTemplate and
 * Spring's commit path both require this holder to exist. Skipping doBegin
 * causes: "No ConnectionHolder available" on commit.
 *
 * Hive does emit a WARN when doBegin calls setAutoCommit(false), but it is
 * non-fatal — Hive silently keeps the connection in autoCommit=true mode.
 *
 * WHAT IS NO-OPED:
 * Only doCommit and doRollback are suppressed. The query executes successfully
 * inside the transaction boundary; we just skip the unsupported commit/rollback
 * calls that would otherwise throw and cause HTTP 500.
 *
 * PROFILE SCOPING:
 * Only active under @Profile("thrift"). On default/prod (AWS Databricks),
 * the standard DataSourceTransactionManager is used and @Transactional
 * works normally.
 */
@Configuration
@Profile("thrift")
public class HiveTransactionConfig {

    @Bean
    @Primary
    public DataSourceTransactionManager transactionManager(DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource) {

            /**
             * No-op: Hive throws SQLFeatureNotSupportedException on commit().
             * The query already executed — there is nothing to commit.
             */
            @Override
            protected void doCommit(DefaultTransactionStatus status) {
                // No-op: Hive does not support JDBC commit
            }

            /**
             * No-op: Hive throws SQLFeatureNotSupportedException on rollback().
             * The exception is already propagated upstream by the query failure.
             */
            @Override
            protected void doRollback(DefaultTransactionStatus status) {
                // No-op: Hive does not support JDBC rollback
            }
        };
    }
}