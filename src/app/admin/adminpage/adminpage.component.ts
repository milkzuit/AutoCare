import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  tableName: string = '';
  tableData: any[] = [];
  errorMessage: string = '';

  // Mapping table names to their respective API URLs
  private tableApiUrls: { [key: string]: string } = {
    'news_letter': 'http://localhost:8080/api/newsLetterModels',  
    'get_quote': 'http://localhost:8080/api/getQuoteModels',
    'feedback': 'http://localhost:8080/api/feedbackModels',
    'contact': 'http://localhost:8080/api/contactModels',
    'users': 'http://localhost:8080/api/userModels'
  };

  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get the table name from the route's data
    this.tableName = this.route.snapshot.data['tableName'];

    // Get the corresponding API URL for the selected table
    const apiUrl = this.tableApiUrls[this.tableName];

    if (apiUrl) {
      // Fetch the table data from the API
      this.http.get<any[]>(apiUrl).subscribe({
        next: (data) => {
          this.tableData = data;  // Store the data in the tableData array
          console.log('Fetched Data for', this.tableName, ':', JSON.stringify(data, null, 2));  // Log data to console (formatted)
        },
        error: (error) => {
          this.errorMessage = 'Error fetching table data';
          console.error('Error fetching data from API:', error);  // Log error if the API fails
        },
        complete: () => {
          console.log('Data fetching completed.');
        }
      });
    } else {
      this.errorMessage = 'Invalid table name';
      console.error('Invalid table name:', this.tableName);
    }
  }
}
