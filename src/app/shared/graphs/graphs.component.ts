import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  @Input('data') data: any;
  @Output('goto') goto = new EventEmitter();
  chart: any = {};
  constructor() { }

  ngOnInit(): void {
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

  onClick() {
    this.goto.emit();
    // const data = {
    //   // name: "test",
    //   // email: "test@example.com"
    //   data: [49.9, 106.4, 60.2, 104.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],

    // }
    // const url = location.origin + "/data?data=" + JSON.stringify(data);
    // console.log(url);
    // window.open(url, "_blank");
  }
}