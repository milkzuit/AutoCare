import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Add this method to get all purchases
  getAllPurchases(): Observable<any> {
    return this.http.get(`${this.apiUrl}/purchases`);
  }

  // Your existing methods...
  downloadReceipt(purchaseId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/purchases/${purchaseId}/receipt`, {
      responseType: 'blob',
    });
  }
}
