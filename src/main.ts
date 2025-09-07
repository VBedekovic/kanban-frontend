import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { AuthInterceptor } from './app/interceptors/auth-interceptor';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

appConfig.providers.push(
  provideHttpClient(
    withInterceptors([AuthInterceptor])
  )
);

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
