import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'app-area-graph',
  templateUrl: './area-graph.component.html',
  styleUrls: ['./area-graph.component.scss']
})
export class AreaGraphComponent implements OnChanges {
  @Input('data') data: any = {};

  chart: any;

  constructor() { }

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
            type: 'area',
            color: '#4164ADCC',
            data: this.data.values_open,
          },
          {
            name: 'Preparatory',
            type: 'area',
            color: '#7DC3BE',
            data: this.data.values_preparatory,
          },
          {
            name: 'Non-Operating',
            type: 'area',
            color: '#cccccc',
            data: this.data.values_non_operating,
          },
          {
            name: 'Closed',
            type: 'area',
            color: '#F8A992',
            data: this.data.values_closed,
          },
        ],
      });
  }

}
