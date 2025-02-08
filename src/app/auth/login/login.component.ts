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

  constructor(private http: HttpClient, private router: Router) {}

  // This function will handle the form submission (login)
  onLogin() {
    console.log(this.loginData);
    // Send the login data to the backend
    this.http
      .post<any>('http://localhost:8080/login', this.loginData)
      .subscribe({
        next: (response) => {
          // Store the user info and token in local storage
          localStorage.setItem('user', JSON.stringify(response));
          alert('Login successful!');
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // If login fails, show an alert and redirect to register page
          if (error.error.message === 'Email not registered!') {
            alert(error.error.message + '. Please sign up.');
            this.router.navigate(['/register']);
          } else {
            alert(error.error.message + '. Try again.');
            // Clear the form
            this.loginData.password = ''; // Reset the form data
          }
        },
      });
  }

  onForgot(){
    this.loginData.email = prompt('Enter your email to reset password') || '';
    localStorage.setItem('email', this.loginData.email);
  }
}
