import { Injectable } from '@angular/core';

const TOKEN_KEY = 'app_token';

@Injectable({ providedIn: 'root' })
export class Token {
  saveToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  removeToken() {
    sessionStorage.removeItem(TOKEN_KEY);
  }

  hasToken(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired();
  }

  // Simple decode to read payload (no external lib). Returns payload or null.
  decodePayload(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = token.split('.')[1];
      return JSON.parse(atob(payload));
    } catch {
      return null;
    }
  }

  getRoles(): string[] {
    const payload = this.decodePayload();
    if (!payload) return [];
    // assume roles claim is array of strings under "roles"
    const roles = payload['roles'] ?? payload['role'] ?? [];
    return Array.isArray(roles) ? roles : [roles];
  }

  getUsername(): string | null {
    const payload = this.decodePayload();
    return payload ? payload['sub'] || payload['username'] : null;
  }

  isTokenExpired(): boolean {
    const payload = this.decodePayload();
    if (!payload || !payload['exp']) return true;
    // exp is seconds since epoch (JWT standard)
    const expiresAt = payload['exp'] * 1000;
    return Date.now() > expiresAt;
  }
}
