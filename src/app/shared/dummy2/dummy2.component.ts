import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexXAxis,
  ApexTitleSubtitle,
  ChartComponent,
} from 'ng-apexcharts';

interface Purchase {
  purchaseDate: string;
  totalAmount: number;
}

@Component({
  selector: 'app-dummy2',
  templateUrl: './dummy2.component.html',
  styleUrls: ['./dummy2.component.css'],
})
export class Dummy2Component implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  };

  purchases: Purchase[] = [
    // { purchaseDate: '2024-12-10T12:43:03.029418', totalAmount: 3869 },
    // { purchaseDate: '2025-01-12T14:15:50.981957', totalAmount: 10085 },
    // { purchaseDate: '2025-02-09T08:10:50.44878', totalAmount: 21744 },
    // { purchaseDate: '2025-02-09T09:34:43.66443', totalAmount: 1298 },
    // { purchaseDate: '2025-02-10T09:54:00.198066', totalAmount: 3869 },
    // { purchaseDate: '2025-02-10T12:04:00.477025', totalAmount: 9190 },
    // { purchaseDate: '2025-02-12T11:57:50.639821', totalAmount: 4399 },
  ];

  constructor(private httpClient: HttpClient) {
    // Convert purchase dates to readable format (YYYY-MM-DD)
    const formattedDates = this.purchases.map(
      (p) => new Date(p.purchaseDate).toISOString().split('T')[0]
    );

    const amounts = this.purchases.map((p) => p.totalAmount);

    this.chartOptions = {
      series: [{ name: 'Total Spend', data: amounts }],
      chart: { type: 'line', height: 350 },
      title: { text: 'Purchase Trends Over Time' },
      xaxis: { categories: formattedDates },
      dataLabels: { enabled: false },
    };
  }
  ngOnInit(): void {
    this.httpClient.get('http://localhost:8080/api/purchases').subscribe(
      (data: any) => {
        this.purchases = data._embedded.purchases;
        console.log(this.purchases);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

}
