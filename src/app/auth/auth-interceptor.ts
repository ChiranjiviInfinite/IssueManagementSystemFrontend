import { Injectable, inject } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Token } from './token';
import { Auth } from './auth';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth = inject(Auth);
  private tokenService = inject(Token);
  private router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken();

    // --- FRONTEND TOKEN EXPIRATION CHECK ---
    if (token) {
      const payload = this.tokenService.decodePayload();
      if (payload?.exp) {
        const now = Math.floor(Date.now() / 1000); // current timestamp in seconds
        if (payload.exp < now) {
          console.warn('JWT expired. Logging out...');
          this.auth.logout();
          return throwError(() => new Error('Token expired'));
        }
      }
    }

    // --- ATTACH TOKEN ---
    const authReq = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

    // --- HANDLE 401 RESPONSES ---
    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          console.warn('Unauthorized (invalid token or server secret changed). Logging out...');
          this.auth.logout();
        }
        return throwError(() => err);
      })
    );
  }
}
