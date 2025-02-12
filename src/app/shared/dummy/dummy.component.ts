import { Component, OnInit } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels, ApexYAxis, ApexTitleSubtitle, ApexStroke, ApexLegend } from 'ng-apexcharts';
import { HttpClient } from '@angular/common/http';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  stroke: ApexStroke;
  legend: ApexLegend;
};

@Component({
  selector: 'app-dummy',
  templateUrl: './dummy.component.html',
  styleUrls: ['./dummy.component.css'],
})
export class DummyComponent implements OnInit {
  public chartOptions!: ChartOptions;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.http.get<any>('http://localhost:8080/api/purchases').subscribe(
      (data) => {
        this.processChartData(data._embedded.purchases);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  processChartData(purchases: any[]) {
    const monthlyData: { [key: string]: number } = {};

    purchases.forEach((purchase) => {
      const date = new Date(purchase.purchaseDate);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;

      if (!monthlyData[monthYear]) {
        monthlyData[monthYear] = 0;
      }
      monthlyData[monthYear] += purchase.totalAmount;
    });

    const categories = Object.keys(monthlyData);
    const seriesData = Object.values(monthlyData);

    this.chartOptions = {
      series: [
        {
          name: 'Total Earnings',
          data: seriesData,
        },
      ],
      chart: {
        type: 'line',
        height: 350,
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: categories,
      },
      yaxis: {
        title: {
          text: 'Total Amount (Rs)',
        },
      },
      title: {
        text: 'Monthly Earnings',
        align: 'center',
      },
      stroke: {
        curve: 'smooth',
      },
      legend: {
        position: 'top',
      },
    };
  }
}
