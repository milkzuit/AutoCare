import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient to make HTTP requests
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  formGroup: FormGroup;
  rating: number = 0;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    // Initialize the form group with controls for rating, name, email, and feedback
    this.formGroup = this.fb.group({
      rating: [0, Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      feedback: ['', Validators.required],
    });
  }

  // Method to set the rating
  setRating(value: number) {
    this.rating = value;
    this.formGroup.get('rating')?.setValue(value); // Set the rating control value when it changes
  }

  // onSubmit method to send the review data to the backend
  onSubmit(): void {
    if (this.formGroup.valid) {
      const reviewData = this.formGroup.value; // Get the form data

      // Send a POST request to the backend
      console.log(reviewData);

      this.http
        .post('http://localhost:8080/api/feedbackModels', reviewData)
        .subscribe({
          next: (response) => {
            console.log('Success!', response);
            // alert('Feedbacked successfully!');
            Swal.fire({
              title: 'Success!',
              text: 'Feedbacked submitted successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            });
          },
          error: (error) => {
            console.error('Error!', error);
            // alert('Something went wrong!');
            Swal.fire({
              title: 'Error!',
              text: 'Server did not respond!',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        });
    }
  }
}
