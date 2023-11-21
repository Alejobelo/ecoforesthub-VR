import { Component, ViewChild } from '@angular/core';
import {
  ChartConfiguration,
  ChartData,
  ChartEvent,
  ChartOptions,
  ChartType,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { LayoutService } from '../../../../layout/layout.service';

@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.scss'],
})
export class BarchartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  filterData: any;
  years: number[] = [];
  shouldRenderChart: boolean = false;
  constructor(private layoutService: LayoutService) {}

  ngOnInit() {
    this.layoutService.filterData$.subscribe((data) => {
      // Actualiza los datos y realiza la lógica para pintar la gráfica
      this.filterData = data;
      this.loadData();
      this.shouldRenderChart = this.years.length > 0;
    });
  }

  loadData() {
    for (
      let year = this.filterData.year1;
      year <= this.filterData.year2;
      year++
    ) {
      this.years.push(year);
    }
    this.barChartData.labels = this.years.map((year) => year.toString());
  }

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [];

  public barChartData: ChartData<'bar'> = {
    labels: this.years.map((year) => year.toString()),
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
    ],
  };

  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {}

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40,
    ];

    this.chart?.update();
  }
}
