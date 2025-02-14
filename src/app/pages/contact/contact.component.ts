import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  name: string = '';
  phone: string = '';
  subject: string = '';
  message: string = '';

  constructor(private http: HttpClient) { }

  onSubmit() {
    const contactModel: any = {
      name: this.name,
      phone: this.phone,
      subject: this.subject,
      message: this.message
    };

    console.log(contactModel);

    this.http
      .post('http://localhost:8080/api/contactModels', contactModel)
      .subscribe({
        next: (response) => {
          console.log('Success!', response);
          // alert('BOOKED successfully!');
          Swal.fire({
            title: "We 'll get back",
            text: 'We received your request & we will contact you soon :)',
            icon: 'info',
            timer: 3000,
            showConfirmButton: false
          });
        },
        error: (error) => {
          console.error('Error!', error);
          // alert('Something went wrong!');
          Swal.fire({
            title: 'Error',
            text: 'Request not submitted. Something is wrong with the server',
            icon: 'info',
            timer: 3000,
            showConfirmButton: false
          });
        },
      });
  }

}
