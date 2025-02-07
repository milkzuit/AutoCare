import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  // Inject Router
  const router = inject(Router);
  let role: any = null; // Initialize role

  // Get the user role from localStorage
  const userData = localStorage.getItem('user'); // Retrieve the stored data
  if (userData) {
    const userObject = JSON.parse(userData); // Parse the JSON string
    role = userObject.role; // ✅ Assign to the outer role variable
    console.log('Role from localStorage: ', role);
  }

  // Get the current URL we are trying to navigate to from RouterStateSnapshot
  const currentRoute = state.url;
  console.log('Attempting to navigate to: ', currentRoute);

  // Define allowed routes for each role
  const roleAllowedRoutes: { [key: string]: string[] } = {
    regular: ['/dashboard'],
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

