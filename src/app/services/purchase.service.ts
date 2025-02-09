// Angular Purchase Service (purchase.service.ts)
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private apiUrl = 'http://localhost:8080/api/purchases';

  constructor(private http: HttpClient) {}

  savePurchase(userId: number, items: any[], total: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, {
      userId,
      items,
      total
    });
  }
}