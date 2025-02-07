import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
  users: any[] = [];
  columns: string[] = [];
  fallbackImage: string = '../assets/images/profile/user-1.jpg'; // Replace with your actual fallback image path

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .get<any>(
        'http://localhost:8080/api/userModels/search/findByRole?role=regular'
      ) // Adjust API URL if needed
      .subscribe((data) => {
        console.log(data); // Debugging output
        this.users = data; // Assign filtered data

        // Extract column names dynamically, excluding '_links' and 'imageData'
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
