// reset-password.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  email: string = '';
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.resetForm = this.fb.group(
      {
        // password: ['', [Validators.required, Validators.minLength(8)]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'] || '';
      this.token = params['token'] || '';

      if (!this.email || !this.token) {
        this.router.navigate(['/login']);
      }
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null
      : { mismatch: true };
  }

  onSubmit() {
    if (this.resetForm.valid) {
      this.http
        .patch(
          'http://localhost:8080/update-password',
          {
            email: this.email,
            password: this.resetForm.get('password')?.value,
          },
          { responseType: 'json' }
        ) // Ensure Angular expects JSON
        .subscribe({
          next: (response: any) => {
            // Explicitly handle the response
            console.log('Success:', response);
            alert(response.message || 'Password reset successfully!');
            this.router.navigate(['/login']);
          },
          error: (error) => {
            console.error('Error:', error);
            alert(
              `Failed to reset password: ${
                error.error?.error || 'Unknown error'
              }`
            );
          },
        });
    }
  }
}
