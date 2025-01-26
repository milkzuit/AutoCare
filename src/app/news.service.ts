import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiKey = '3472d5e6cd7f4cc090794e0e2764c757';
  private apiUrl =
    'https://newsapi.org/v2/everything?q=car&apiKey=' + this.apiKey;

  constructor(private http: HttpClient) {}

  getNews(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.apiUrl}&page=${page}&pageSize=${pageSize}`);
  }
}
