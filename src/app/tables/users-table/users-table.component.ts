import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css'],
})
export class UsersTableComponent implements OnInit {
getUserImage(_t20: any) {
throw new Error('Method not implemented.');
}
  data: any[] = []; // To store the fetched data
  columns: string[] = []; // To store the column names dynamically
  role: string = 'regular'; // Default role if no parameter is passed
  model: string = ''; // This will hold the model name (quoteModels, etc.)
  fallbackImage: string = '../assets/images/profile/user-1.jpg'; // Replace with your fallback image
  users: any[] = [];

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the role and model from the route parameter
    this.route.url.subscribe((url) => {
      console.log('URL Parameters:', url);
      this.role = url[0]?.path === 'admin' ? 'admin' : 'regular'; // Check role from route
      this.model = url[1]?.path; // Model is the second parameter (e.g., 'quoteModels')

      console.log('Role:', this.role, 'Model:', this.model);
      this.fetchData();
    });
  }
  fetchData() {
    // Define the API endpoints for different models
    const apiUrls = {
      getquote: 'http://localhost:8080/api/getQuoteModels',
      newsletter: 'http://localhost:8080/api/newsletterModels',
      feedback: 'http://localhost:8080/api/feedbackModels',
      product: 'http://localhost:8080/api/productModels',
      contact: 'http://localhost:8080/api/contactModels',
    };
  
    // Use keyof to explicitly type the model
    const modelKey = this.model as keyof typeof apiUrls;
  
    // Check if the model is a valid key and make the API call
    if (apiUrls[modelKey]) {
      this.http.get<any>(apiUrls[modelKey]).subscribe((data) => {
        console.log(`${this.model} Data:`, data);
        this.data = data;
  
        // Dynamically extract columns, excluding unwanted keys
        if (this.data.length > 0) {
          this.columns = Object.keys(this.data[0]).filter(
            (key) =>
              key !== '_links' && key !== 'imageData' && key !== 'password'
          );
        }
      });
    } else {
      console.error(`Invalid model: ${this.model}`);
    }
  }
}  