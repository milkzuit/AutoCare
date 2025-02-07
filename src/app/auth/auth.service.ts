import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser = {};

  isAdmin() {
    let role = JSON.parse(localStorage.getItem('user') || '{}').role;

    if(role == 'admin') return true;

    return false;
  }

  isRegular() {
    let role = JSON.parse(localStorage.getItem('user') || '{}').role;

    if(role == 'regular') return true;

    return false;
  }
}
