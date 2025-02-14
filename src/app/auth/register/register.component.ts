import { Component, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    // Initialize the form
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onRegister() {
    this.errorMessage = null; // Reset error message

    if (this.registerForm.invalid) {
      return;
    }

    this.http
      .post<any>('http://localhost:8080/register', this.registerForm.value, {
        responseType: 'json', // Explicitly expect a JSON response
      })
      .subscribe({
        next: (response) => {
          console.log('sdfds', response);
          // On success, store the user data in localStorage
          localStorage.setItem('user', JSON.stringify(response));
          // alert(response.message || 'Registration successful!'); // Show success message
          Swal.fire({
            title: 'Success',
            text: 'Registration successful!',
            icon: 'success',
          });

          this.router.navigate(['/dashboard']); // Navigate to the dashboard
        },
        error: (err) => {
          if (err.status === 409) {
            // alert(this.errorMessage);
            Swal.fire({
              title: 'Error',
              text: 'Email is already in use. Redirecting to login page.',
              icon: 'error',
            });
            this.router.navigate(['/login']); // Navigate to the login page
          } else {
            Swal.fire({
              title: 'Error',
              text: 'An unexpected error occurred. Please try again later.',
              icon: 'error',
            });
          }
        },
      });
  }
}
