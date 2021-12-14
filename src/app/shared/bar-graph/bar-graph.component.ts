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
        chart: {
          height: (9 / 16 * 100) + '%' // 16:9 ratio
      },
      exporting: {
        enabled: false
      },
        title: {
          text: ''
      },
      subtitle: {
          text: ''
      },
      yAxis: {
          title: {
              text: 'Count'
          }
      },
      xAxis: {
        categories:this.data.index,
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
      series: [
        {
          name: this.data.columns,
          type: 'column',
          data: this.data.data
      }, 
    ],
      });
    }
  }
}
