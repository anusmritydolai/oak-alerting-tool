import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { StockChart } from 'angular-highcharts';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit, OnChanges {
  @Input('data') stockChartData: any = {};
  @Output('goto') goto = new EventEmitter();
  chart: any = {};
  unit: string = 'kWh';

  constructor() { }
  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.stockChartData) {
      console.log(this.stockChartData)
    this.chart = new StockChart({
      chart:{
        marginTop: 40,
        height: 500,
        events: {
          load: function() {
            var chart = this;
            chart.renderer.text('Click on legends to modify chart',this.chartWidth/2.3,this.chartHeight-2)
            .attr({
              zIndex: 3,
              fill: 'black'
            })
            .add();
          }
        }
      },
      exporting: { 
        enabled: false 
      },
    title: {
        text: ''
    },
    legend: {
      enabled:true,
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
    tooltip: {
      pointFormat: '{series.name}: <b>{point.y}</b> '+this.unit,
    },
    rangeSelector: {
            allButtonsEnabled: true,
            buttons: [{
              type: 'minute',
              count: 1500,
              text: '5 Min',
              dataGrouping: {
                  forced: true,
                  units: [['minute', [5]]]
              }
          },{
                type: 'hour',
                count: 24,
                text: 'Hour',
                dataGrouping: {
                    forced: true,
                    units: [['hour', [1]]]
                }
            },{
              type: 'day',
              count: 31,
              text: 'Day',
              dataGrouping: {
                  forced: true,
                  units: [['day', [1]]]
              }
              }],
            buttonTheme: {
                width: 60
            },
            selected: 0
        },
    series: [{
      name: 'Main L1',
      data: this.stockChartData.graph1_table1,
      type: 'line',
      threshold: null,
      color:'#4164AD',
    },
    {
      name: 'Main L2',
      data: this.stockChartData.graph1_table2,
      type: 'line',
      threshold: null,
      color:'#F3837A',
    },
    {
      name: 'Main L3',
      data: this.stockChartData.graph1_table3,
      type: 'line',
      threshold: null,
      color:'#7DC3BE',
    },
    // {
    //   name: 'Alerts',
    //   data: this.stockChartData.alert_table,
    //   type: 'line',
    //   threshold: null,
    //   color:'#7DD3BE',
    // }
  ]
    });
  }
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