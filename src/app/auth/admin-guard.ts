import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from './token';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(Token);

  // Get roles and normalize to uppercase
  const roles = tokenService.getRoles().map(r => r.toUpperCase());

  // Check if token exists and user is admin
  if (tokenService.hasToken() && roles.includes('ROLE_ADMIN')) {
    return true;
  }

  // Not admin or token invalid → redirect to login
  router.navigate(['/']);
  return false;
};
