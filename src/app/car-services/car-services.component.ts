import { Component } from '@angular/core';

@Component({
  selector: 'app-car-services',
  templateUrl: './car-services.component.html',
  styleUrls: ['./car-services.component.css']
})
export class CarServicesComponent {
  // List of available services with prices
  services = [
    { name: 'Oil Change', description: 'Quick and reliable oil change services for your vehicle.', icon: 'fas fa-oil-can', price: 999 },
    { name: 'Engine Repair', description: 'Expert engine repair services to keep your car running smoothly.', icon: 'fas fa-tools', price: 4500 },
    { name: 'Tire Services', description: 'Handle all tire-related issues, from tire change to repair.', icon: 'fas fa-car', price: 1200 },
    { name: 'Brake Services', description: 'Brake repair, brake pad replacement, and brake fluid services.', icon: 'fas fa-car-crash', price: 1800 },
    { name: 'Fluid Replacement', description: 'Replace essential fluids like transmission fluid, coolant, etc.', icon: 'fas fa-tint', price: 1500 },
    { name: 'Battery Services', description: 'Battery testing, charging, and replacement services.', icon: 'fas fa-battery-full', price: 2500 },
    { name: 'Air Conditioning & Heating', description: 'Ensure your A/C and heating system is fully operational.', icon: 'fas fa-snowflake', price: 3000 },
    { name: 'Suspension & Steering', description: 'Inspect and replace suspension and steering components.', icon: 'fas fa-cogs', price: 4000 },
    { name: 'Exhaust System Services', description: 'Repair or replace exhaust system to reduce noise and emissions.', icon: 'fas fa-exclamation-circle', price: 2200 },
    { name: 'Windshield Services', description: 'Repair cracks or replace windshields for safety.', icon: 'fas fa-shield-alt', price: 2500 },
    { name: 'Timing Belt Replacement', description: 'Prevent engine damage with timely timing belt replacement.', icon: 'fas fa-clock', price: 5000 },
    { name: 'Fuel System Services', description: 'Fuel injector cleaning and fuel filter replacement.', icon: 'fas fa-gas-pump', price: 3000 },
    { name: 'Clutch Services', description: 'Repair or replace manual car’s clutch for smooth gear transitions.', icon: 'fas fa-hand-paper', price: 7000 },
    { name: 'Detailing & Cleaning', description: 'From exterior washes to full interior detailing and waxing.', icon: 'fas fa-broom', price: 1500 }
  ];

  cart: any[] = [];
  showCartPopup = false;

  toggleCart(service: any) {
    const index = this.cart.indexOf(service);
    if (index > -1) {
      this.cart.splice(index, 1);
    } else {
      this.cart.push(service);
    }
  }

  isInCart(service: any): boolean {
    return this.cart.includes(service);
  }

  toggleCartPopup() {
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

  removeFromCart(service: any): void {
    this.cart = this.cart.filter(item => item.name !== service.name);
  }

  clearCart() {
    this.cart = [];
    this.toggleCartPopup();
  }

  checkout() {
    alert('Thank you for booking our services!');
    this.clearCart();
  }

  scrollToServices() {
    document.getElementById('services-Section')?.scrollIntoView({ behavior: 'smooth' });
  }
}
