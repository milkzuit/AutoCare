

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the Service interface for better type safety
interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  private baseUrl = 'http://localhost:8080/api/services/servicelist'; // Replace with your backend URL
  private checkoutUrl = 'http://localhost:8080/api/cart/checkout';

  constructor(private http: HttpClient) {}

  // Get all services
  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl);
  }

  // Add a new service
  addService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.baseUrl, service);
  }

  // Update a service
  updateService(id: number, service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.baseUrl}/${id}`, service);
  }

  // Delete a service
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }


checkoutCart(cartData: any): Observable<any> {
  return this.http.post<any>(this.checkoutUrl, cartData, { responseType: 'json' });
}


    
}
