import { Component, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent {


  rating: number = 0;





  // Method to set the rating
  setRating(value: number) {
    this.rating = value;
  }
}
