import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaintform.component.html',
  styleUrls: ['./complaintform.component.css']
})
export class ComplaintComponent {
  // Explicitly type receipt as File | null
  complaintData = {
    complainantName: '',
    email: '',
    dateOfFilling: '',
    receipt: null as File | null,  // Receipt can be null or a File
    complaintMessage: ''
  };

  constructor(private http: HttpClient) {}

  // Handle file input change
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.complaintData.receipt = file;  // Set the selected file to receipt
    }
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('complainantName', this.complaintData.complainantName);
    formData.append('email', this.complaintData.email);
    formData.append('dateOfFilling', this.complaintData.dateOfFilling);

    // Append the receipt file only if it's not null
    if (this.complaintData.receipt) {
      formData.append('receipt', this.complaintData.receipt, this.complaintData.receipt.name);  // Append file and its name
    }

    formData.append('complaintMessage', this.complaintData.complaintMessage);

    // Make HTTP POST request directly in the component
    this.http.post('http://localhost:8080/api/complaints', formData)
      .subscribe(
        (response) => {
          console.log('Complaint submitted successfully!', response);
        },
        (error) => {
          console.error('Error submitting complaint', error);
        }
      );
  }
}
