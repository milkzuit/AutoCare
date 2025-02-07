import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logoutGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  localStorage.clear(); // Clear all stored data
  return router.createUrlTree(['/']); // Redirect to home page
};
