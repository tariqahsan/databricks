package mil.disa.oe.dto;
import java.time.LocalDateTime;
public record ApiResponse<T>(
    boolean success, String message, T data, String timestamp
) {
    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(true, "Success", data,
            LocalDateTime.now().toString());
    }
    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(true, message, data,
            LocalDateTime.now().toString());
    }
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, message, null,
            LocalDateTime.now().toString());
    }
}
