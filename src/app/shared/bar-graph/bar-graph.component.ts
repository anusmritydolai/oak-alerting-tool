import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.scss'],
})
export class BarGraphComponent implements OnChanges {
  @Input('data') data: any = {};

  chart: any;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data)
      this.chart = new Chart({
        title: {
          text: '',
        },
        chart: {
          marginTop: 40,
          events: {
            load: function () {
              var chart = this;
              chart.renderer
                .text(
                  'Click on legends to modify chart',
                  this.chartWidth / 2.45,
                  this.chartHeight - 2
                )
                .attr({
                  zIndex: 3,
                  fill: 'black',
                })
                .add();
            },
          },
        },
        exporting: { enabled: false },
        xAxis: {
          categories: this.data.x_axis,
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Consumption (kWh)',
          },
          stackLabels: {
            enabled: false,
            style: {
              fontWeight: 'bold',
              color: 'gray',
            },
          },
        },

        tooltip: {
          headerFormat: '<b>{point.x}</b><br/>',
          pointFormat:
            '{series.name}: {point.y} kWh<br/>Total: {point.stackTotal} kWh',
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            dataLabels: {
              enabled: false,
            },
          },
        },
        series: [
          {
            name: 'Operating',
            type: 'column',
            color: '#4164ADCC',
            data: this.data.values_open,
          },
          {
            name: 'Preparatory',
            type: 'column',
            color: '#7DC3BE',
            data: this.data.values_preparatory,
          },
          {
            name: 'Non-Operating',
            type: 'column',
            color: '#cccccc',
            data: this.data.values_non_operating,
          },
          {
            name: 'Closed',
            type: 'column',
            color: '#F8A992',
            data: this.data.values_closed,
          },
        ],
      });
  }
}
