import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css',
})
export class ReviewComponent {
  formGroup: FormGroup; // Declare the formGroup property

  rating: number = 0;

  // Method to set the rating
  setRating(value: number) {
    this.rating = value;
  }

  constructor(private fb: FormBuilder) {
    // Initialize the form group with a control for the rating
    this.formGroup = this.fb.group({
      value: [0], // Default rating value
    });
  }

  onSubmit(): void {
    console.log('Submitted Form Value:', this.formGroup.value);
  }
}
