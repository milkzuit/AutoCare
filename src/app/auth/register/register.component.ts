import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerData = {
    username: '',
    email: '',
    password: '',
  };

  constructor(private apiService: ApiService) {}

  onSubmit(): void {
    this.apiService.registerUser(this.registerData).subscribe({
      next: (response: any) => {
        console.log('User registered successfully', response);
        // Handle successful registration (e.g., navigate to login page)
      },
      error: (error: any) => {
        console.error('Error registering user', error);
        // Handle registration error
      },
    });
  }
  // next: This callback is called when the observable emits a value.
  // error: This callback is called if the observable emits an error.
}
