import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent {
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
