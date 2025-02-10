import { AuthService } from './../../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  details = JSON.parse(localStorage.getItem('user') || '{}');
  imageUrl: SafeUrl = '../assets/images/profile/user-1.jpg'; // fallback image

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, public authService: AuthService) {}

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
}
