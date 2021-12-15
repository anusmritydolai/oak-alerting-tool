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
  @ViewChild('paginator1') paginator: any;
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
  chart3: any;
  chart4: any;
  threshold: number = 0.95;
  loadings: boolean = true;


  constructor(private route: ActivatedRoute, private apiService: ApiService) {
  }
  ngAfterViewInit(): void {    
    this.dataSource.paginator = this.paginator;
    this.dataSource2.paginator = this.paginator2;
    this.dataSource2.sort = this.sort;
  }
  
  ngOnInit(): void {
    this.loadings = true;
    this.route.queryParams.subscribe(params => {
      this.start_date = params.start_date;
      this.end_date = params.end_date;
      this.type = params.type;
      this.phase = params.phase;   
      this.threshold = params.threshold;   
    });

    const data = {
      alert_analyse: this.type,
      phase: this.phase,
      threshold: this.threshold,
      site_name: localStorage.getItem('site_slug'),
      start_date: this.start_date + ' 00:00:00',
      end_date: this.end_date + ' 23:59:59'
    };

    this.apiService.test(data).subscribe(data => {      
      Object.keys(data).map((key, index) => { data[key] = JSON.parse(data[key]) });
      
      this.displayedColumns = ['index'].concat(data.alert_table.columns).concat('Deep Analysis');      
      const dataSource = data.alert_table.data.map((dat: any[], i: number) => [data.alert_table.index[i]].concat(dat))      
      this.dataSource = new MatTableDataSource(dataSource);
      setTimeout(() => this.dataSource.paginator = this.paginator);
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }, () => {}, () => this.loadings = false);

  }
  
  show2(element: any) {
    this.loadings = true;
    this.apiService.test2({
      alert_analyse: this.type,
      phase: this.phase,
      threshold: this.threshold,
      site_name: localStorage.getItem('site_slug'),
      start_date: this.start_date + ' 00:00:00',
      end_date: this.end_date + ' 23:59:59',
      alert_no: element[0],
    }).subscribe(data => {
      Object.keys(data).map((key, index) => { data[key] = JSON.parse(data[key]) });      
      console.log('apiService', data);
      data.histogram_1.columns = data.histogram_1.columns;
      data.histogram_1.index = data.histogram_1.index;
      data.histogram_1.data = data.histogram_1.data;
      data.histogram_2.columns = data.histogram_2.columns;
      data.histogram_2.index = data.histogram_2.index;
      data.histogram_2.data = data.histogram_2.data;
      data.Mix_Max_Table.columns = data.Mix_Max_Table.columns.map((column: any[]) => column[0]+' '+column[1])
      this.chart3 = data.histogram_1;
      this.chart4 = data.histogram_2;
      this.displayedColumns2 = ['index'].concat(data.Mix_Max_Table.columns);      
      const dataSource = data.Mix_Max_Table.data.map((dat: any[], i: number) => [data.Mix_Max_Table.index[i]].concat(dat))            
      this.dataSource2 = new MatTableDataSource(dataSource);
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator2;
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }

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
              text: 'Energy (kWh)'
          }
      },
      xAxis: {
        type: 'datetime',
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
          name: data.graph2_table1.columns[1],
          type: 'line',
          data: data.graph2_table1.data
      }, {
          name: data.graph2_table2.columns[1],
          type: 'line',
          data: data.graph2_table2.data
      }, {
        name: data.graph2_table3.columns[1],
        type: 'line',
        data: data.graph2_table3.data
    }],
  
      });

       this.chart2 = new Chart({
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
              text: 'Energy (kWh)'
          }
      },
      xAxis: {
        type:'datetime',
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
      series: [
        {
          name: data.graph3_table1.columns[1],
          type: 'line',
          data: data.graph2_table1.data
      }, {
          name: data.graph3_table2.columns[1],
          type: 'line',
          data: data.graph2_table2.data
      },
      {
        name: data.graph3_table3.columns[1],
        type: 'line',
        data: data.graph2_table1.data
    }],
  
      });
      this.loadings= false;
    });


    
    
  }

}


