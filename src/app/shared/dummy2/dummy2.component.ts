import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.css'],
})
export class Dummy2Component implements OnInit {
  totalThisYear: number = 0;
  totalLastYear: number = 0;
  percentageChange: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('http://localhost:8080/api/purchases').subscribe(
      (data) => {
        this.processYearlyData(data._embedded.purchases);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  processYearlyData(purchases: any[]) {
    const currentYear = new Date().getFullYear();
    const lastYear = currentYear - 1;

    let thisYearTotal = 0;
    let lastYearTotal = 0;

    purchases.forEach((purchase) => {
      const purchaseYear = new Date(purchase.purchaseDate).getFullYear();

      if (purchaseYear === currentYear) {
        thisYearTotal += purchase.totalAmount;
      } else if (purchaseYear === lastYear) {
        lastYearTotal += purchase.totalAmount;
      }
    });

    this.totalThisYear = thisYearTotal;
    this.totalLastYear = lastYearTotal;

    // if (this.totalLastYear > 0) {
    //   this.percentageChange =
    //     ((this.totalThisYear - this.totalLastYear) / this.totalLastYear) * 100;

    //   // Cap the percentage change at 100%
    //   this.percentageChange = Math.min(this.percentageChange, 100);
    // } else {
    //   this.percentageChange = this.totalThisYear > 0 ? 100 : 0;
    // }

    // if (this.totalLastYear > 0) {
    //   let growthFactor = this.totalThisYear / this.totalLastYear;
    //   this.percentageChange = Math.log(growthFactor + 1) * 100; // Logarithmic scaling
    // } else {
    //   this.percentageChange = this.totalThisYear > 0 ? 100 : 0;
    // }

    let timesGrowth = this.totalThisYear / this.totalLastYear;
    this.percentageChange = Math.round(timesGrowth * 100) / 100; // Show as a multiple (e.g., "12x")
  }
}
