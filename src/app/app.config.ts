import { ApplicationConfig, inject, 
  provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, Injector } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthInterceptor } from './auth/auth-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(
      withInterceptors([
        (req, next) => {
          const injector = inject(Injector);
          const interceptor = injector.get(AuthInterceptor);
          const handler = {
            handle: next
          };
          return interceptor.intercept(req, handler);
        }
      ])
    ),
    AuthInterceptor, 
    provideRouter(routes)
  ]
};
