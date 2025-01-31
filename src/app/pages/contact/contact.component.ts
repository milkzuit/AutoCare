import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
          alert('BOOKED successfully!');
        },
        error: (error) => {
          console.error('Error!', error);
          alert('Something went wrong!');
        },
      });
  }

}
