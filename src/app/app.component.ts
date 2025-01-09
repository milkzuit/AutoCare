import { Component } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';

@Component({
  selector: 'app-root',
  // standalone: true,  // Optional, only if this is a standalone component
  // imports: [FeedbackComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'AutoCare';
}
