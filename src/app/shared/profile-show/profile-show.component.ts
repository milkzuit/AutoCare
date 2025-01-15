import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent {
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
