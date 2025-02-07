
  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  export interface ChatMessage {
    content: string;
    type: 'user' | 'bot';
    timestamp: Date;
  }
  
  @Injectable({
    providedIn: 'root'
  })
  export class GeminiService {
    private readonly API_KEY = 'myapi';
    private readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
    constructor(private http: HttpClient) {}
  
    generateResponse(prompt: string): Observable<any> {
      return this.http.post(`${this.API_URL}?key=${this.API_KEY}`, {
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      });
    }
  }
