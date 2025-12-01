import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Token } from './token';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(Token);

  // Only allow if token exists and is valid
  if (tokenService.hasToken()) {
    return true;
  }

  // No valid token → redirect to login
  router.navigate(['/']);
  return false;
};

