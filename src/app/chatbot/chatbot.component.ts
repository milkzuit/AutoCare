import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ChatMessage, GeminiService } from '../gemini.service';

interface GeminiResponse {
  generatedText: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css'],
})
export class ChatbotComponent implements AfterViewInit {
  messages: ChatMessage[] = [];
  userInput = '';
  isLoading = false;
  isChatOpen = false; // Flag to toggle chat visibility
  isFirstOpen = true; // To check if it's the first time opening the chat
  @ViewChild('messagesContainer')
  private messagesContainer!: ElementRef;

  constructor(private geminiService: GeminiService) {}

  ngAfterViewInit() {
    // Automatically send the bot's first message when the chat opens
    if (this.isChatOpen && this.isFirstOpen) {
      this.isFirstOpen = false;
      this.messages.push({
        content: 'hey Its me MOJO...How may I help you?',
        type: 'bot',
        timestamp: new Date(),
      });
    }
  }

  sendMessage() {
    if (!this.userInput.trim()) return;

    // Add user message
    this.messages.push({
      content: this.userInput,
      type: 'user',
      timestamp: new Date(),
    });

    this.isLoading = true;

    // Get AI response
    this.geminiService.generateResponse(this.userInput).subscribe({
      next: (response) => {
        this.messages.push({
          content: response.candidates[0].content.parts[0].text,
          type: 'bot',
          timestamp: new Date(),
        });
      },
      error: (error) => {
        console.error('Error:', error);
        this.messages.push({
          content: 'Sorry, I encountered an error. Please try again.',
          type: 'bot',
          timestamp: new Date(),
        });
      },
      complete: () => {
        this.isLoading = false;
        this.userInput = '';
      },
    });
  }

  toggleChat() {
    this.isChatOpen = !this.isChatOpen; // Toggle chat modal

    // Automatically send the first message when chat opens
    if (this.isChatOpen && this.isFirstOpen) {
      this.isFirstOpen = false;
      this.messages.push({
        content: "Hey I'm MOJO..How may I help you?",
        type: 'bot',
        timestamp: new Date(),
      });
    }
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom() {
    const container = this.messagesContainer.nativeElement;
    container.scrollTop = container.scrollHeight;
  }
}
