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

    return next.handle(authReq);
  }
}
