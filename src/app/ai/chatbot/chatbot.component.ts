
  import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  
  export interface ChatMessage {
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
  }
  
  @Component({
    selector: 'app-chatbot',
    templateUrl: './chatbot.component.html',
    styleUrls: ['./chatbot.component.css']
  })
  export class ChatbotComponent implements OnInit, AfterViewChecked {
    @ViewChild('scrollMe') private messagesContainer!: ElementRef;
    
    isOpen = false;
    currentMessage = '';
    messages: ChatMessage[] = [];
    
    constructor(private http: HttpClient) {}
  
    ngOnInit() {
      this.messages.push({
        type: 'bot',
        content: "Hi! I'm MOJO, your car service assistant. How can I help you today?",
        timestamp: new Date()
      });
    }
  
    ngAfterViewChecked() {
      this.scrollToBottom();
    }
  
    private scrollToBottom(): void {
      try {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }
  
    toggleChat() {
      this.isOpen = !this.isOpen;
    }
    sendMessage() {
      if (!this.currentMessage.trim()) return;
  
      console.log('Sending message:', this.currentMessage); // Debug log
  
      this.http.post<{response: string}>('/api/chat', {
        message: this.currentMessage
      }).subscribe({
        next: (response) => {
          console.log('Received response:', response); // Debug log
          this.messages.push({
            type: 'bot',
            content: response.response,
            timestamp: new Date()
          });
        },
        error: (error) => {
          console.error('Error:', error); // Debug log
          this.messages.push({
            type: 'bot',
            content: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date()
          });
        }
      });
  }
}