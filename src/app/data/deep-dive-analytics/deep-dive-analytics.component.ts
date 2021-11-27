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
  start_date: Date = new Date();
  end_date: Date = new Date();
  type: string = '';
  phase: string = '';
  data: any[]=[];
  displayedColumns: string[] = [];
  displayedColumns2: string[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }
  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.start_date = new Date(params.start_date);
      this.end_date = new Date(params.end_date);
      this.type = params.type;
      this.phase = params.phase;      
    });

    this.apiService.test().subscribe(data => {
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
    console.log(element);
    this.apiService.test2().subscribe(data => {
      data[''].columns = data[''].columns.map((column: any[]) => column[0]+' '+column[1])      
      this.displayedColumns2 = ['index'].concat(data[''].columns);      
      const dataSource = data[''].data.map((dat: any[], i: number) => [data[''].index[i]].concat(dat))            
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
    });
    
  }

}
