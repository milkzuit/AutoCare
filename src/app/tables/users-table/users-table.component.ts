import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];
  columns: string[] = [];
  fallbackImage: string = '../assets/images/profile/user-1.jpg'; // Fallback image
  title = 'Table';
  role: string = 'regular'; // Default role

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.url.subscribe((url) => {
      console.log('URL:', url.map((u) => u.path).join('/')); // Debugging output

      if (url.length > 0) {
        const path = url[0].path;

        if (path === 'admin' || path === 'regular') {
          this.role = path;
          this.fetchUsersByRole();
        } else if (path === 'getquote') {
          this.fetchGetQuoteModels();
        } else if (path === 'news-letter') {
          this.fetchNewsLetterModels();
        } else if (path === 'feedback') {
          this.fetchFeedbackModels();
        } else if (path === 'contact') {
          this.fetchContactModels(); // New function for contact models
        }
      }
    });
  }

  // Fetch users based on role (admin or regular)
  fetchUsersByRole() {
    this.http
      .get<any>(
        `http://localhost:8080/api/userModels/search/findByRole?role=${this.role}`
      )
      .subscribe((data) => {
        this.title = this.role.charAt(0).toUpperCase() + this.role.slice(1)
        // console.log(
        //   `${this.role.charAt(0).toUpperCase() + this.role.slice(1)} Users:`,
        //   data
        // );
        this.users = data;

        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) =>
              key !== '_links' && key !== 'imageData' && key !== 'password'
          );
        }
      });
  }

  // Fetch Get Quote models
  fetchGetQuoteModels() {
    this.http
      .get<any>('http://localhost:8080/api/getQuoteModels')
      .subscribe((data) => {
        console.log('Get Quote Data:', data);

        this.title = 'Quotation Request';
        this.users = data._embedded?.getQuoteModels || [];

        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) => key !== '_links' // Exclude unwanted fields
          );
        }
      });
  }

  // Fetch NewsLetter models
  fetchNewsLetterModels() {
    this.http
      .get<any>('http://localhost:8080/api/newsLetterModels')
      .subscribe((data) => {
        console.log('NewsLetter Data:', data);

        this.title = ' NewsLetter Subscribers';
        this.users = data._embedded?.newsLetterModels || [];

        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) => key !== '_links' // Exclude unwanted fields
          );
        }
      });
  }

  fetchFeedbackModels() {
    this.http
      .get<any>('http://localhost:8080/api/feedbackModels')
      .subscribe((data) => {
        console.log('Feedback Data:', data);

        this.title = 'Feedbacks Received';
        this.users = data._embedded?.feedbackModels || [];

        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) => key !== '_links' // Exclude unwanted fields
          );
        }
      });
  }

  fetchContactModels() {
    this.http
      .get<any>('http://localhost:8080/api/contactModels')
      .subscribe((data) => {
        console.log('Contact Data:', data);

        this.title = 'To be contacted';
        this.users = data._embedded?.contactModels || [];

        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) => key !== '_links' // Exclude unwanted fields
          );
        }
      });
  }

  // Function to display fallback image if no image exists
  getUserImage(user: any): string {
    return user.imageData
      ? `data:image/jpeg;base64,${user.imageData}`
      : this.fallbackImage;
  }
}
