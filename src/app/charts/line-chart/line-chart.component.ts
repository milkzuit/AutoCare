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

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;

  public chartOptions!: ChartOptions;

  purchases: any;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.fetchPurchases();
  }

  fetchPurchases(): void {
    this.httpClient.get('http://localhost:8080/api/purchases').subscribe({
      next: (response: any) => {
        this.purchases = response._embedded.purchases;
        console.log('line chart', this.purchases);
        this.updateChart();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      },
    });
  }

  updateChart(): void {
    if (!this.purchases.length) return;

    const formattedDates = this.purchases.map(
      (p: any) => new Date(p.purchaseDate).toISOString().split('T')[0]
    );

    const amounts = this.purchases.map((p: any) => p.totalAmount);

    this.chartOptions = {
      series: [{ name: 'Total Spend', data: amounts }],
      chart: { type: 'line', height: 350 },
      title: { text: 'Purchase Trends Over Time' },
      xaxis: { categories: formattedDates },
      dataLabels: { enabled: false },
    };
  }
}
