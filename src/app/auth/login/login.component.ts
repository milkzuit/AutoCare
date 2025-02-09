import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // The login data model (email and password)
  loginData = { email: '', password: '' };

  isPasswordVisible = false;

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
  constructor(private http: HttpClient, private router: Router) {}

  // This function will handle the form submission (login)
  onLogin() {
    console.log(this.loginData);
    // Send the login data to the backend
    this.http
      .post<any>('http://localhost:8080/login', this.loginData)
      .subscribe({
        next: (response) => {
          console.log("sdfds", response);
          // Store the user info and token in local storage
          localStorage.setItem('user', JSON.stringify(response));
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log('Error:', error);
          // If login fails, show an alert and redirect to register page
          alert(
            error.error.message || 'Invalid login credentials. Please sign up.'
          );
          this.router.navigate(['/register']);
        },
      });
  }
}
