import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig, AppComponent } from './app/app';

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
