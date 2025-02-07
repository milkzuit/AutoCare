import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
  details = JSON.parse(localStorage.getItem('user') || '{}');

  // Extracting the details (if they exist)
  name = this.details.username || null;
  email = this.details.email || null;
  mobile = this.details.mobile || null;
  address = this.details.address || null;

  @Output() cancelEdit = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

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
    const userId = JSON.parse(localStorage.getItem('user') || '{}').id;

    // Create update payload with only the fields that can be updated
    const updatePayload = {
      username: this.name,
      mobile: this.mobile,
      address: this.address,
    };

    this.http
      .patch(`http://localhost:8080/api/userModels/${userId}`, updatePayload)
      .subscribe({
        next: (response) => {
          console.log('Changes saved successfully', response);
          // Update the local storage with new values
          const updatedUser = { ...this.details, ...updatePayload };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          this.cancelEdit.emit();
        },
        error: (error) => {
          console.error('Error saving changes', error);
          // Handle error appropriately (show message to user)
        },
      });
  }
}
