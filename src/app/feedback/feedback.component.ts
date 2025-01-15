import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  scrolled = false;
  imageOpacity = 1;
  imageTranslateY = 0;
  userRating = 0;
  stars = [1, 2, 3, 4, 5];  // Keep as number[] for rating stars

  feedback = {
    name: '',
    email: '',
    phone: '',
    feedbackText: ''
  };

  constructor() {}

  ngOnInit(): void {
    // Scroll to top when component loads
    setTimeout(() => window.scrollTo(0, 0), 0);
  }

  // Handle window scroll to change image opacity and translateY
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    this.scrolled = scrollTop > 100;
    const scrollPercentage = Math.min(scrollTop / 400, 1);
    this.imageOpacity = Math.max(1 - scrollPercentage, 0);
    this.imageTranslateY = Math.min(scrollTop / 2, 500);
  }

  // Rate a star (no need to change stars array type)
  rate(star: number): void {
    this.userRating = star;
  }

  // Method to validate email format (only for Gmail addresses)
  validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return emailPattern.test(email);
  }

  // Validate name (only allows letters)
  validateName(name: string): boolean {
    const namePattern = /^[a-zA-Z]+$/;
    return namePattern.test(name);
  }

  // Validate phone (only allows digits)
  validatePhone(phone: string): boolean {
    const phonePattern = /^[0-9]{10}$/;
    return phonePattern.test(phone);
  }

  // Handle form submission
  submitFeedback(): void {
    if (!this.feedback.name || !this.feedback.email || !this.feedback.phone || !this.feedback.feedbackText || this.userRating === 0) {
      alert('Please fill out all fields and select a rating before submitting.');
      return;
    }
    if (!this.validateEmail(this.feedback.email)) {
      alert('Please provide a valid Gmail address.');
      return;
    }
    if (!this.validateName(this.feedback.name)) {
      alert('Name should only contain letters.');
      return;
    }
    if (!this.validatePhone(this.feedback.phone)) {
      alert('Phone number should be 10 digits.');
      return;
    }
    alert('Thank you for your valuable feedback!');
    console.log('Feedback Submitted:', { rating: this.userRating, ...this.feedback });
  }
}
