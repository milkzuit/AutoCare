import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-yearly-chart',
  templateUrl: './yearly-chart.component.html',
  styleUrls: ['./yearly-chart.component.css'],
})

export class YearlyChartComponent implements OnInit {
  totalThisYear: number = 0;
  totalLastYear: number = 0;
  percentageChange: number = 0;

  public chartOptions: any;

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

    // Calculate percentage growth
    // if (this.totalLastYear > 0) {
    //   this.percentageChange =
    //     ((this.totalThisYear - this.totalLastYear) / this.totalLastYear) * 100;
    // } else {
    //   this.percentageChange = this.totalThisYear > 0 ? 100 : 0;
    // }

    console.log('This Year Total:', this.totalThisYear, currentYear);
    console.log('Last Year Total:', this.totalLastYear, lastYear);
    console.log('Percentage Change (Capped):', this.percentageChange);
    let timesGrowth = this.totalThisYear / this.totalLastYear;
    this.percentageChange = Math.round(timesGrowth * 100) / 100; // Show as a multiple (e.g., "12x")

    // Setup the donut chart
    this.chartOptions = {
      series: [this.totalThisYear, this.totalLastYear],
      chart: {
        type: 'donut',
      },
      labels: ['This Year', 'Last Year'],
      colors: ['#00C49F', '#FFBB28'], // Green for this year, Yellow for last year
      dataLabels: {
        enabled: true,
        formatter: (val: any) => `${Math.round(val)}%`,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
    };
  }
}
