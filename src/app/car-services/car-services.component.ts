import { Component } from '@angular/core';

import { Observable } from 'rxjs';
import { ServicesService } from '../services/services.service';

// Define the Service interface for better type safety
interface Service {
  name: string;
  description: string;
  icon: string;
  price: number;
}

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.css']
})

export class CarServicesComponent {
  // List of available services with prices
  services: Service[] = [];
  cart: Service[] = [];
  showCartPopup = false;
  errorMessage: string | null = null; // To store error messages


  constructor(private servicesService: ServicesService) {}

  ngOnInit() {
    // Fetch the services from the backend when the component initializes
    this.fetchServices();
  }

  fetchServices(): void {
    this.servicesService.getServices().subscribe(
      (data: Service[]) => {
        this.services = data; // Assign fetched data
        this.errorMessage = null; // Clear any previous error message
      },
      (error: any) => {
        console.error('Error fetching services', error);
        this.errorMessage = 'Failed to load services. Please try again later.'; // Set error message
      }
    );
  }
  

  toggleCart(service: Service): void {
    const index = this.cart.indexOf(service);
    if (index > -1) {
      this.cart.splice(index, 1);
    } else {
      this.cart.push(service);
    }
  }

  isInCart(service: Service): boolean {
    return this.cart.includes(service);
  }

  toggleCartPopup(): void {
    this.showCartPopup = !this.showCartPopup;
  }

  calculateSubtotal(): number {
    return this.cart.reduce((total, service) => total + service.price, 0);
  }

  calculateGST(): number {
    return this.calculateSubtotal() * 0.18;
  }

  calculateGrandTotal(): number {
    return this.calculateSubtotal() + this.calculateGST();
  }

  removeFromCart(service: Service): void {
    this.cart = this.cart.filter(item => item.name !== service.name);
  }

  clearCart(): void {
    this.cart = [];
    this.toggleCartPopup();
  }

  checkout(): void {
    alert('Thank you for booking our services!');
    this.clearCart();
  }

  scrollToServices(): void {
    document.getElementById('services-Section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
