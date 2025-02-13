import { Component, ViewChild } from '@angular/core';
import {
  ApexChart,
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexXAxis,
  ChartComponent
} from "ng-apexcharts";

interface Purchase {
  userId: number;
  totalAmount: number;
}

@Component({
  selector: 'app-user-spend-chart',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css']
})
export class DummyComponent {
  @ViewChild("chart") chart!: ChartComponent;

  public chartOptions: {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    dataLabels: ApexDataLabels;
    title: ApexTitleSubtitle;
  };

  purchases: Purchase[] = [
    { userId: 23, totalAmount: 23042 },
    { userId: 6, totalAmount: 16928 },
    { userId: 26, totalAmount: 14484 }
  ];

  constructor() {
    const users = this.purchases.map(p => `User ${p.userId}`);
    const amounts = this.purchases.map(p => p.totalAmount);

    this.chartOptions = {
      series: [{ name: "Total Spend", data: amounts }],
      chart: { type: "bar", height: 350 },
      title: { text: "Total Spend Per User" },
      xaxis: { categories: users },
      dataLabels: { enabled: false }
    };
  }
}
