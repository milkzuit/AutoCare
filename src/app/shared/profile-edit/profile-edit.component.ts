import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {


  constructor(private http: HttpClient) {}

  name = '';
  address = '';
  email = '';
  mobile = '';
  serverMsg = 'error';

  register() {
        let data = {
          name: this.name,
          address: this.address,
          email: this.email,
          mobile: this.mobile
        };
    
        this.http.post("http://localhost:8080/userRegister", data).subscribe({
          next: (res: any) => {
            console.log(res);
            localStorage.setItem("status", "1")
          },
          error: (e :any) => {
            console.log(e);
            this.serverMsg = e['error']['msg'] || 'Registration failed. Please try again later.';
          }
        });
      }






  @Output() cancelEdit = new EventEmitter<void>();

  showProfile() {
    // Emit the event to notify the parent component
    this.cancelEdit.emit();
    // The parent component can listen to this event in the template using (cancelEdit)="toggleEditMode()"
    /* 
    this.cancelEdit.emit(): When this is called (e.g., from the showProfile method), 
    it triggers the cancelEdit event, and the parent component's method (e.g., toggleEditMode()) will be executed.
    */
  }

  // Add this method for saving changes if needed
  saveChanges() {
    // Logic for saving changes goes here
    console.log('Changes saved.');
    this.cancelEdit.emit();
  }
}
