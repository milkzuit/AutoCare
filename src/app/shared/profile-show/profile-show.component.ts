import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profile-show',
  templateUrl: './profile-show.component.html',
  styleUrl: './profile-show.component.css',
})
export class ProfileShowComponent implements OnInit {
  details = JSON.parse(localStorage.getItem('user') || '{}');

  // Extracting the details (if they exist)
  name = this.details.username || null;
  email = this.details.email || null;
  mobile = this.details.mobile || null;
  address = this.details.address || null;
  imageUrl: SafeUrl = '../assets/images/profile/user-1.jpg'; // fallback image

  @Output() editClicked = new EventEmitter<void>();

  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
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
