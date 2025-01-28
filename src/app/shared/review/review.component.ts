import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  formGroup: FormGroup; // Declare the formGroup property
  rating: number = 0;

  // Constructor to initialize FormBuilder
  constructor(private fb: FormBuilder) {
    // Initialize the form group with a control for the rating
    this.formGroup = this.fb.group({
      value: [0], // Default rating value
    });
  }

  // Method to set the rating
  setRating(value: number) {
    this.rating = value;
  }

  // Optional: onSubmit method to log the form value
  onSubmit(): void {
    console.log('Submitted Form Value:', this.formGroup.value);
  }
}
