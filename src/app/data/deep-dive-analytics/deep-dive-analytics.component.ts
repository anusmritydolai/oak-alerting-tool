import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'angular-highcharts';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-deep-dive-analytics',
  templateUrl: './deep-dive-analytics.component.html',
  styleUrls: ['./deep-dive-analytics.component.scss']
})
export class DeepDiveAnalyticsComponent implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator: any;
  chart: any;
  pipe = new DatePipe('en-GB');
  start_date: Date = new Date();
  end_date: Date = new Date();
  type: string = '';
  phase: string = '';
  data: any[]=[];
  displayedColumns: string[] = [];
  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }
  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
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

    this.apiService.test2().subscribe(data => {
      this.displayedColumns = ['index'].concat(data.alert_table.columns).concat('Deep Analysis');
      const dataSource = data.alert_table.data.map((dat: any[], i: number) => [data.alert_table.index[i]].concat(dat))      
      this.dataSource = new MatTableDataSource(dataSource);
      this.dataSource.paginator = this.paginator;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }



}
