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
  fallbackImage: string = '../assets/images/profile/user-1.jpg'; // Replace with your actual fallback image path
  role: string = 'regular'; // Default role if no parameter is passed

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the role from the route parameter
    this.route.url.subscribe((url) => {
      console.log('1', url);
      console.log('2', url[0].path);
      if (url.length > 0 && url[0].path === 'admin') {
        this.role = 'admin';
      } else {
        this.role = 'regular';
      }

      this.fetchUsers();
    });
  }

  fetchUsers() {
    // Fetch users based on the current role (either 'admin' or 'regular')
    this.http
      .get<any>(
        `http://localhost:8080/api/userModels/search/findByRole?role=${this.role}`
      )
      .subscribe((data) => {
        console.log(
          `${this.role.charAt(0).toUpperCase() + this.role.slice(1)} Users:`,
          data
        ); // Debugging output
        this.users = data; // Assign users data

        // Extract columns dynamically, excluding '_links', 'imageData', and 'password'
        if (this.users.length > 0) {
          this.columns = Object.keys(this.users[0]).filter(
            (key) =>
              key !== '_links' && key !== 'imageData' && key !== 'password'
          );
        }
      });
  }

  getUserImage(user: any): string {
    return user.imageData
      ? `data:image/jpeg;base64,${user.imageData}` // Display the actual image if available
      : this.fallbackImage; // Otherwise, use the fallback image
  }
}
