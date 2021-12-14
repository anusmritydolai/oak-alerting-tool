import {
  Component,
  Input,
  OnChanges,
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

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.data) {
      this.chart = undefined
      if (this.data)
      this.chart = new Chart({
        title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      yAxis: {
          title: {
              text: 'Energy (kWh)'
          }
      },
      xAxis: {
          accessibility: {
              rangeDescription: ''
          }
      },
      legend: {
        enabled: true,
        align: 'center',
        symbolPadding: 10,
        symbolWidth: 70,
        itemDistance: 50,
        itemStyle:{
          fontSize:'14px',
          fontWeight:'bold',
          textOverflow:'ellipsis',
          padding:'30px'
          }
      },
      plotOptions: {
          series: {
              label: {
                  connectorAllowed: false
              },
              pointStart: 2010
          }
      },
      series: [
        {
          name: this.data.columns,
          type: 'area',
          data: this.data.data
      }, 
      {
          name: this.data.columns,
          type: 'area',
          data: this.data.da
      }, {
        name: this.data.columns,
        type: 'area',
        data: this.data.da
    }],
  
      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
      });
    }
  }
}
