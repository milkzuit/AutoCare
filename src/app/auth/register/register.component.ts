import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
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

  onSubmit() {
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
          console.log('Success:', response);
          // On success, store the user data in localStorage
          localStorage.setItem('user', JSON.stringify(this.registerForm.value));
          alert(response.message || 'Registration successful!'); // Show success message
          this.router.navigate(['/dashboard']); // Navigate to the dashboard
        },
        error: (err) => {
          console.log('Error:', err);
          // Handle error response
          if (err.status === 400) {
            this.errorMessage =
              err.error || 'Registration failed. Please try again.';
          } else {
            this.errorMessage =
              'An unexpected error occurred. Please try again later.';
          }
        },
      });
  }
}


