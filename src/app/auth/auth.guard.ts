import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject Router
  const router = inject(Router);

  // Get the user role from localStorage
  const role = localStorage.getItem('role');
  console.log('Role from localStorage: ', role);

  // Get the current URL we are trying to navigate to from RouterStateSnapshot
  const currentRoute = state.url;
  console.log('Attempting to navigate to: ', currentRoute);

  // Define allowed routes for each role
  const roleAllowedRoutes: { [key: string]: string[] } = {
    student: ['/dashboard', '/check', '/login'],
    manager: ['/manager', '/course', '/login'],
    trainer: ['/home', '/marks', '/login'],
  };

  // Check if the role is valid and if the current route is allowed
  if (role && roleAllowedRoutes[role]?.includes(currentRoute)) {
    console.log(`Allowed for ${role}: `, currentRoute);
    return true;
  }

  // If not allowed, redirect to login
  console.log('Navigation blocked. Redirecting to login.');
  return router.createUrlTree(['/login']);
};
