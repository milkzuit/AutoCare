import { Component } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {
  rating: number = 0;  // Initialize the rating to 0

  // Method to set the rating when a star is clicked
  setRating(starValue: number): void {
    this.rating = starValue;  // Update the rating value
  }
}
