import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Chart } from 'angular-highcharts';


@Component({
  selector: 'app-area-line-graph',
  templateUrl: './area-line-graph.component.html',
  styleUrls: ['./area-line-graph.component.scss']
})
export class AreaLineGraphComponent implements OnInit {
  // @Input('data') data: any = {};
  chart: any;
ranges = [
    [1246406400000, 0, 4],
    [1246492800000, 0, 8.5],
    [1246579200000, 0, 11],
    [1246665600000, 0, 8],
    [1246752000000, 0, 7],
    [1246838400000, 0, 5],
    [1246924800000, 0, 3],
    [1247011200000, 0, 3.2],
    [1247097600000, 0, 9],
    [1247184000000, 0, 10],
    [1247270400000, 0, 11],
    [1247356800000, 0, 9]
]
averages = [
    [1246406400000, 2],
    [1246492800000, 5],
    [1246579200000, 11],
    [1246665600000, 9],
    [1246752000000, 3],
    [1246838400000, 2],
    [1246924800000, 2.5],
    [1247011200000, 9],
    [1247097600000, 11],
    [1247184000000, 10.5],
    [1247270400000, 6],
    [1247356800000, 3]
];

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart({
      title: {
        text: '',
      },
    xAxis: {
        type: 'datetime',
        accessibility: {
            rangeDescription: 'Range: Jul 30-08 to Jul 05-09'
        }
    },

    yAxis: {
        title: {
            text: null
        }
    },

    tooltip: {
        shared: true,
        valueSuffix: '°C'
    },

    series: [{
      name: 'Temperature',
      type: 'line',
      data: this.averages,
      zIndex: 1,
  }, {
      name: 'Range',
      data: this.ranges,
      type: 'arearange',
      lineWidth: 0,
      linkedTo: ':previous',
      fillOpacity: 0.3,
      zIndex: 0,
      marker: {
          enabled: false
      }
  }]
});
  }
}


