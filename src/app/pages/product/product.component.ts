import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent {
  // services = [
  //   { name: 'Periodic Services', image: 'assets/images/landing/1.png' },
  //   { name: 'AC Service & Repair', image: 'assets/images/landing/18.png' },
  //   { name: 'Batteries', image: 'assets/images/landing/19.png' },
  //   { name: 'Tyres & Wheel Care', image: 'assets/images/landing/15.png' },
  //   { name: 'Denting & Painting', image: 'assets/images/landing/16.png' },
  //   { name: 'Detailing Services', image: 'assets/images/landing/17.png' },
  //   { name: 'Car Spa & Cleaning', image: 'assets/images/landing/10.png' },
  //   { name: 'Car Inspections', image: 'assets/images/landing/13.png' },
  //   { name: 'Windshields & Lights', image: 'assets/images/landing/14.png' },
  //   { name: 'Suspension & Fitments', image: 'assets/images/landing/9.png' },
  //   { name: 'Clutch & Body Parts', image: 'assets/images/landing/11.png' },
  //   { name: 'Insurance Claims', image: 'assets/images/landing/12.png' },
  // ];

  // curatedServices = [
  //   { name: 'Periodic Services', image: 'assets/images/landing/1.png' },
  //   { name: 'AC Service & Repair', image: 'assets/images/landing/18.png' },
  //   { name: 'Batteries', image: 'assets/images/landing/19.png' },
  //   { name: 'Tyres & Wheel Care', image: 'assets/images/landing/15.png' },
  //   { name: 'Denting & Painting', image: 'assets/images/landing/16.png' },
  //   { name: 'Detailing Services', image: 'assets/images/landing/17.png' },
  //   { name: 'Car Spa & Cleaning', image: 'assets/images/landing/10.png' },
  //   { name: 'Car Inspections', image: 'assets/images/landing/13.png' },
  //   { name: 'Windshields & Lights', image: 'assets/images/landing/14.png' },
  //   { name: 'Suspension & Fitments', image: 'assets/images/landing/9.png' },
  //   { name: 'Clutch & Body Parts', image: 'assets/images/landing/11.png' },
  //   { name: 'Insurance Claims', image: 'assets/images/landing/12.png' },
  // ];

  name: string = '';
  phone: string = '';
  subject: string = '';
  message: string = '';

  constructor(private http: HttpClient) {}

  onSubmit() {
    const contactModel: any = {
      name: this.name,
      phone: this.phone,
      subject: this.subject,
      message: this.message,
    };

    console.log(contactModel);

    this.http
      .post('http://localhost:8080/api/contactModels', contactModel)
      .subscribe({
        next: (response) => {
          console.log('Success!', response);
          // alert('BOOKED successfully!');
          Swal.fire({
            title: 'Success!',
            text: 'Your action was successful.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
        },
        error: (error) => {
          console.error('Error!', error);
          // alert('Something went wrong!');
          Swal.fire({
            title: 'Error!',
            text: 'Server did not respond!',
            icon: 'error',
            confirmButtonText: 'Try Again'
          });
        },
      });
  }
}
