// no-auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from './auth';

export const noAuthGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  const payload = auth.getPayload();

  if (payload) {
    const userRole = (auth.getPayload()?.roles?.[0] || 'USER').toUpperCase();
        
      // redirect based on role
      if (userRole === 'ROLE_ADMIN') {
        router.navigate(['/admin']);
      } else {
        router.navigate(['/dashboard']);
      }
    return false; // prevent access to login/register
  }

  return true; // allow access if not logged in
};
