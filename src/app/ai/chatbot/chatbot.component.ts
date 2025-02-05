import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  user?: string;
  bot?: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  isOpen = false;
  messages: ChatMessage[] = [];
  userMessage: string = '';

  constructor(private http: HttpClient) {}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage(message: string) {
    this.messages.push({ user: message }); // Display the user's message
    this.userMessage = ''; // Clear the input field

    // Send POST request to the backend API
    this.http.post<string>('/api/chatbot/message', { message })
      .subscribe({
        next: (response) => {
          this.messages.push({ bot: response }); // Display the bot's response
        },
        error: (error) => {
          console.error(error);  // Handle error
          this.messages.push({ bot: "Sorry, I couldn't process your request. Try again later." });
        },
        complete: () => {
          console.log('Message sent successfully');
        }
      });
  }
}
