import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { ApiService } from 'src/app/service/api.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-deep-dive-analytics',
  templateUrl: './deep-dive-analytics.component.html',
  styleUrls: ['./deep-dive-analytics.component.scss']
})
export class DeepDiveAnalyticsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  dataSource2: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: any;
  @ViewChild('paginator2') paginator2: any;
  @ViewChild(MatSort) sort: any;
  chart: any;
  pipe = new DatePipe('en-GB');
  start_date: string = '';
  end_date: string = '';
  type: string = '';
  phase: string = '';
  data: any[]=[];
  displayedColumns: string[] = [];
  displayedColumns2: string[] = [];
  chart2: any;
  chart3 = {"seq":["Operating","Non Operating","Preparatory","Closed"],"x_axis":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"y_axis":null,"values_open":[315.35,269.63,234.42,254.55,257.25,503.9,278.98],"values_preparatory":[177.84,196.43,145.63,159.24,147.82,113.87,81.32],"values_non_operating":[236.43,173.52,137.67,151.76,149.76,105.61,162.83],"values_closed":[0,0,0,0,0,0,0],"open_total":2114,"preparatory_total":1022,"non_operating_total":1118,"closed_total":0}
  chart4 = {"seq":["Operating","Non Operating","Preparatory","Closed"],"x_axis":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"y_axis":null,"values_open":[315.35,269.63,234.42,254.55,257.25,503.9,278.98],"values_preparatory":[177.84,196.43,145.63,159.24,147.82,113.87,81.32],"values_non_operating":[236.43,173.52,137.67,151.76,149.76,105.61,162.83],"values_closed":[0,0,0,0,0,0,0],"open_total":2114,"preparatory_total":1022,"non_operating_total":1118,"closed_total":0}

  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }
  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.start_date = params.start_date;
      this.end_date = params.end_date;
      this.type = params.type;
      this.phase = params.phase;      
    });

    const data = {
      alert_analyse: this.type,
      phase: this.phase,
      threshold: 0.95,
      site_name: localStorage.getItem('site_slug'),
      start_date: this.start_date + ' 00:00:00',
      end_date: this.end_date + ' 23:59:59'
    };

    this.apiService.test(data).subscribe(data => {      
      Object.keys(data).map((key, index) => { data[key] = JSON.parse(data[key]) });      
      this.displayedColumns = ['index'].concat(data.alert_table.columns).concat('Deep Analysis');      
      const dataSource = data.alert_table.data.map((dat: any[], i: number) => [data.alert_table.index[i]].concat(dat))      
      this.dataSource = new MatTableDataSource(dataSource);
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });

  }
  
  show2(element: any) {
    this.apiService.test2({
      alert_analyse: this.type,
      phase: this.phase,
      threshold: 0.95,
      site_name: localStorage.getItem('site_slug'),
      start_date: this.start_date + ' 00:00:00',
      end_date: this.end_date + ' 23:59:59',
      alert_no: 1,
    }).subscribe(data => {
      console.log(data)
      Object.keys(data).map((key, index) => { data[key] = JSON.parse(data[key]) });      
      data.Mix_Max_Table.columns = data.Mix_Max_Table.columns.map((column: any[]) => column[0]+' '+column[1])      
      this.displayedColumns2 = ['index'].concat(data.Mix_Max_Table.columns);      
      const dataSource = data.Mix_Max_Table.data.map((dat: any[], i: number) => [data.Mix_Max_Table.index[i]].concat(dat))            
      this.dataSource2 = new MatTableDataSource(dataSource);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator2;
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }

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
          name: 'Energy',
          type: 'line',
          data: data.graph2_table1.data
      }, {
          name: 'threshold',
          type: 'line',
          data: data.graph2_table2.data
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

       this.chart2 = new Chart({
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
          name: 'Energy',
          type: 'line',
          data: data.graph2_table1.data
      }, {
          name: 'threshold',
          type: 'line',
          data: data.graph2_table2.data
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

    //   this.chart3 = new Chart({
    //     chart: {
    //         type: 'area'
    //     },
    //     title: {
    //         text: 'Historic and Estimated Worldwide Population Distribution by Region'
    //     },
    //     subtitle: {
    //         text: 'Source: Wikipedia.org'
    //     },
    //     accessibility: {
    //         point: {
    //             valueDescriptionFormat: '{index}. {point.category}, {point.y:,.0f} millions, {point.percentage:.1f}%.'
    //         }
    //     },
    //     xAxis: {
    //         categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
    //         tickmarkPlacement: 'on',
    //         title: {
    //             enabled: false
    //         }
    //     },
    //     yAxis: {
    //         labels: {
    //             format: '{value}%'
    //         },
    //         title: {
    //             // enabled: false
    //         }
    //     },
    //     tooltip: {
    //         pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} millions)<br/>',
    //         split: true
    //     },
    //     plotOptions: {
    //         area: {
    //             stacking: 'percent',
    //             lineColor: '#ffffff',
    //             lineWidth: 1,
    //             marker: {
    //                 lineWidth: 1,
    //                 lineColor: '#ffffff'
    //             }
    //         }
    //     },
    //     series: [{
    //         name: 'Asia',
    //         data: [502, 635, 809, 947, 1402, 3634, 5268]
    //     }, {
    //         name: 'Africa',
    //         data: [106, 107, 111, 133, 221, 767, 1766]
    //     }, {
    //         name: 'Europe',
    //         data: [163, 203, 276, 408, 547, 729, 628]
    //     }, {
    //         name: 'America',
    //         data: [18, 31, 54, 156, 339, 818, 1201]
    //     }, {
    //         name: 'Oceania',
    //         data: [2, 2, 2, 6, 13, 30, 46]
    //     }]
    // });

    });


    
    
  }

}


