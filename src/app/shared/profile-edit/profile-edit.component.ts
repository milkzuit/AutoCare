import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css'],
})
export class ProfileEditComponent implements OnInit {
  details = JSON.parse(localStorage.getItem('user') || '{}');

  // Extracting the details (if they exist)
  name = this.details.username || null;
  email = this.details.email || null;
  mobile = this.details.mobile || null;
  address = this.details.address || null;
  imageUrl: SafeUrl = '../assets/images/profile/user-1.jpg'; // fallback image

  @Output() cancelEdit = new EventEmitter<void>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.loadProfileImage();
  }

  loadProfileImage() {
    const userId = this.details.id;
    if (userId) {
      this.http
        .get(`http://localhost:8080/api/products/image/${userId}`, {
          responseType: 'blob',
        })
        .subscribe({
          next: (image: Blob) => {
            const objectUrl = URL.createObjectURL(image);
            this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
          },
          error: () => {
            // Keep fallback image if error occurs
            console.log('Using fallback image');
          },
        });
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      const userId = this.details.id;
      this.http
        .post(`http://localhost:8080/api/products/upload/${userId}`, formData)
        .subscribe({
          next: (response) => {
            console.log('Image uploaded successfully');
            this.loadProfileImage(); // Reload the image
          },
          error: (error) => {
            console.error('Error uploading image:', error);
          },
        });
    }
  }

  // # Existing Edit Code Logic
  showProfile() {
    // Emit the event to notify the parent component
    // this.cancelEdit.emit();
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
          // # Parent component - edit event
          this.cancelEdit.emit();
        },
        error: (error) => {
          console.error('Error saving changes', error);
          // Handle error appropriately (show message to user)
        },
      });
  }
}
