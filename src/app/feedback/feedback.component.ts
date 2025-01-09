import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  // For handling the image fade and move-up effect
  scrolled = false;

  // Image URL for the background (this path is relative to assets folder)
  imageUrl = '/assets/images/backgrounds/new.jpg'; // Adjust as necessary

  // Image opacity and position for scroll effect
  imageOpacity = 1;
  imageTranslateY = 0;

  // User rating (customer input)
  userRating = 0;
  
  // Previous rating (mocked data, it could be fetched from a service)
  previousRating: number | null = 4; // Example: Previous rating is 4 out of 5

  // Placeholder for the user's feedback text
  feedbackText = '';

  // Array to handle the star ratings (5 stars)
  stars = [1, 2, 3, 4, 5];

  // Previous feedback info (mocked data)
  previousFeedback = {
    name: 'John Doe',
    description: 'I really enjoyed the product, it exceeded my expectations!'
  };

  constructor() { }

  ngOnInit(): void {}

  // Scroll listener to trigger image animation
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Trigger the feedback content appearance after scrolling 100px
    if (scrollTop > 100) {
      this.scrolled = true;
    } else {
      this.scrolled = false;
    }

    // Calculate the opacity and translateY based on scroll position
    const scrollPercentage = Math.min(scrollTop / 400, 1); // Fade faster by reducing this threshold
    this.imageOpacity = Math.max(1 - scrollPercentage, 0); // Fade the image from 1 to 0
    this.imageTranslateY = Math.min(scrollTop / 2, 500); // Move the image upwards, up to a limit of 500px
  }

  // Handle the rating input from the customer
  rate(star: number): void {
    this.userRating = star;
  }

  // Submit feedback function
  submitFeedback(): void {
    // Here you can process the feedback submission, e.g., sending to an API
    console.log('Feedback submitted:', {
      rating: this.userRating,
      feedbackText: this.feedbackText
    });
    alert('Thank you for your feedback!');
  }
}
