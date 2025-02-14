import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
          // Store the user info and token in local storage
          localStorage.setItem('user', JSON.stringify(response));
          // alert('Login successful!');
          Swal.fire({
            title: 'Good job!',
            text: 'Login successful!',
            icon: 'success',
          });
          if (response.role === 'regular') this.router.navigate(['/main-layout/home']);
          else this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          // If login fails, show an alert and redirect to register page
          if (error.error.message === 'Email not registered!') {
            // alert(error.error.message + '. Please sign up.');
            Swal.fire({
              title: 'Error!',
              text: 'Email not registered!. Please sign up.',
              icon: 'error',
              confirmButtonText: 'Cool',
            });
            this.router.navigate(['/register']);
          } else {
            // alert(error.error.message + '. Try again.');
            Swal.fire({
              title: 'Error!',
              text: 'Incorrect password. Try again.',
              icon: 'info',
              confirmButtonText: 'Great 😋',
            });
            // Clear the form
            this.loginData.password = ''; // Reset the form data
          }
        },
      });
  }

  async onForgot() {
    // this.loginData.email = prompt('Enter your email to reset password') || '';
    const { value: email } = await Swal.fire({
      title: 'Input email address',
      input: 'email',
      inputLabel: 'Your email address',
      inputPlaceholder: 'Enter your email address',
    });
    if (email) {
      this.http
        .get(
          `http://localhost:8080/api/userModels/search/existsByEmail?email=${email}`
        )
        .subscribe({
          // If the email exists, send the verification code
          next: (response: any) => {
            if (response) {
              this.router.navigate(['/verification'], {
                queryParams: { email: email },
              });
            } else {
              Swal.fire({
                title: 'Error!',
                text: 'Reset Password available only for registered users!',
                icon: 'error',
                confirmButtonText: 'Cool',
              });
            }
          },
          error: (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'Server did not respond! Please try again later.',
              icon: 'warning',
              confirmButtonText: 'Ok',
            });
          },
        });
    }
  }
}
