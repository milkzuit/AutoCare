import { Component } from '@angular/core';
import { ChatMessage, GeminiService } from '../gemini.service';

// Define the GeminiResponse interface outside the class
interface GeminiResponse {
  generatedText: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']  // Fix 'styleUrl' to 'styleUrls'
})
export class ChatbotComponent { messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;

  constructor(private geminiService: GeminiService) {}

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.messages.push({
      content: this.userInput,
      type: 'user',
      timestamp: new Date()
    });

    this.isLoading = true;
    
    // Get AI response
    this.geminiService.generateResponse(this.userInput)
      .subscribe({
        next: (response) => {
          this.messages.push({
            content: response.candidates[0].content.parts[0].text,
            type: 'bot',
            timestamp: new Date()
          });
        },
        error: (error) => {
          console.error('Error:', error);
          this.messages.push({
            content: 'Sorry, I encountered an error. Please try again.',
            type: 'bot',
            timestamp: new Date()
          });
        },
        complete: () => {
          this.isLoading = false;
          this.userInput = '';
        }
      });
  }

}
