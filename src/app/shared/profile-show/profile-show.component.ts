import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent {
  details = JSON.parse(localStorage.getItem('user') || '{}');

  // Extracting the details (if they exist)
  name = this.details.username || null;
  email = this.details.email || null;
  phone_no = this.details.phone_no || null;
  address = this.details.address || null;

  @Output() editClicked = new EventEmitter<void>();

  editProfile() {
    // Emit the event to notify the parent component
    this.editClicked.emit();
    // The parent component can listen to this event in the template using (editClicked)="toggleEditMode()"
    /* 
    this.editClicked.emit(): When this is called (e.g., from the editProfile method), 
    it triggers the editClicked event, and the parent component's method (e.g., toggleEditMode()) will be executed.
    */
  }
}
