import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-deep-dive-analytics',
  templateUrl: './deep-dive-analytics.component.html',
  styleUrls: ['./deep-dive-analytics.component.scss']
})
export class DeepDiveAnalyticsComponent implements OnInit {
  chart: any;
  pipe = new DatePipe('en-GB');
  start_date: Date = new Date();
  end_date: Date = new Date();
  type: string = '';
  phase: string = '';
  constructor(private route: ActivatedRoute) {
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.start_date = new Date(params.start_date);
      this.end_date = new Date(params.end_date);
      this.type = params.type;
      this.phase = params.phase;      
    });
    this.chart = new Chart({
      title: {
        text: '',
      },
      legend: {
        enabled: false,
      },
      exporting: { enabled: false },
      xAxis: {
        title: {
          text: 'Hours',
        },
        tickInterval: 10,
      },
      yAxis: {
        title: {
          text: 'Cost (£)',
        },
      },
      plotOptions: {
        area: {
          fillColor: {
            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
            stops: [
              [0, '#d7e6e991'],
              [1, '#d7e6e991'],
            ],
          },
          lineWidth: 2,
          marker: {
            enabled: false,
          },
          shadow: false,
          states: {
            hover: {
              lineWidth: 1,
            },
          },
          threshold: null,
        },
      },
      series: [
        {
          name: 'Cost (£)',
          type: 'area',
          pointInterval: 10,
         data: [49.9, 106.4, 60.2, 104.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        },
      ],
    });
  }

}
