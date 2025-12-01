import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Token } from './token';

interface RegisterReq { username: string; email: string; password: string; }
interface LoginReq { username: string; password: string; }

interface LoginResponse {
  token: string;
  message: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private baseUrl = '/api/auth';

   // Observable to track login state
  private loggedIn: BehaviorSubject<boolean>;
  isLoggedIn$: Observable<boolean>;
  
  constructor(
    private http: HttpClient,
    private tokenService: Token,
    private router: Router
  ) { 
    // initialize loggedIn after tokenService is available
    this.loggedIn = new BehaviorSubject<boolean>(this.tokenService.hasToken());
    this.isLoggedIn$ = this.loggedIn.asObservable();
  }



  /** REGISTER */
  register(data: RegisterReq): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }

  /** LOGIN */
  login(data: LoginReq): Observable<any> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, data)
      .pipe(
        tap(res => {
          // Save token
          this.tokenService.saveToken(res.token);

          // Update login state
          this.loggedIn.next(true);
        })
      );
  }

  /** LOGOUT */
  logout() {
    this.tokenService.removeToken();
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  /** Get decoded payload */
  getPayload() {
    return this.tokenService.decodePayload();
  }

  /** Check if user has role */
  hasRole(role: string): boolean {
    const payload = this.getPayload();
    if (!payload || !payload['roles']) return false;
    return payload['roles'].includes(role);
  }
}
