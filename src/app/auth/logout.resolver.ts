import { ResolveFn } from '@angular/router';

export const LogoutResolver: ResolveFn<boolean> = (route, state) => {
  localStorage.clear(); // Clear user session
  window.location.href = '/'; // Force redirect to home
  return true; // Allow navigation
};
