import { Component } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  services = [
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'AC Service & Repair', image: '/assets/images/products/1.png' },
    { name: 'Batteries', image: '/assets/images/products/1.png' },
    { name: 'Tyres & Wheel Care', image: '/assets/images/products/1.png' },
    { name: 'Denting & Painting', image: '/assets/images/products/1.png' },
    { name: 'Detailing Services', image: '/assets/images/products/1.png' },
    { name: 'Car Spa & Cleaning', image: '/assets/images/products/1.png' },
    { name: 'Car Inspections', image: '/assets/images/products/1.png' },
    { name: 'Windshields & Lights', image: '/assets/images/products/1.png' },
    { name: 'Suspension & Fitments', image: '/assets/images/products/1.png' },
    { name: 'Clutch & Body Parts', image: '/assets/images/products/1.png' },
    { name: 'Insurance Claims', image: '/assets/images/products/1.png' },
  ];

  curatedServices = [
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
    { name: 'Periodic Services', image: '/assets/images/products/1.png' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
