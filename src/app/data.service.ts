import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'http://localhost:8080/api/student'; // Your Spring Boot API URL

  constructor(private http: HttpClient) {}

  getData(): any {
    console.log(this.http.get(this.apiUrl));
    return this.http.get(this.apiUrl);
  }

  getData1(): any {
    return this.http.get('http://localhost:8080/api/student/12');
  }

  submitQuote(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/getQuoteModels', data);
  }
}
