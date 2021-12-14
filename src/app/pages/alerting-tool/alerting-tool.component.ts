import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-alerting-tool',
  templateUrl: './alerting-tool.component.html',
  styleUrls: ['./alerting-tool.component.scss'],
})
export class AlertingToolComponent implements OnInit {
  hourlyCostData: any;
  show: boolean = false;
  pipe = new DatePipe('en-GB');
  chart: any;
  faCalendar = faCalendarAlt;
  typeList: any[] = [
    { name: 'Voltage Imbalance', defaultValue: 2, values: [0.5,1,2,5] },
    { name: 'Load Imbalance', defaultValue: 15, values: [10,15,20] },
    { name: 'Low Power Factor', defaultValue: 0.95, values: [0.95,0.9,0.85,0.8] },
    { name: 'Abnormal Change In Energy Consumption', defaultValue: 0, values: [] },
  ];
  selectedType?: any = this.typeList[0];
  selectedTypes?: string;
  typeList2: string[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  selectedDate: any = [new Date(), new Date()];
  selectedMonth = {
    month: this.pipe.transform(new Date(), 'MMMM'),
    year: this.pipe.transform(new Date(), 'YYYY'),
  };
  stockChartData: any = {};
  selectedGraph: string = '';
  selectedThreshold: any;
  thresholds!: any[];
  data!: { [key: string]: any; };
  constructor(private apiService: ApiService) {
    this.minDate.setMonth(this.minDate.getMonth() - 4);
    this.maxDate.setMonth(this.maxDate.getMonth());
  }
  change(): void {      
    this.thresholds = this.selectedType.values
    this.selectedThreshold = this.selectedType.defaultValue
  }

  ngOnInit(): void {
    this.apiService.getSummaryTableData(localStorage.getItem('site_slug')).subscribe((data)=> {
      // data = {"Sub-Mains 1.1": "{\"name\":\"Sub-Mains 1.1\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[5,1]}",
      //   "Mains 1": "{\"name\":\"Mains 1\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[5,1]}",
      //   "Mains 2": "{\"name\":\"Mains 2\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[15,3]}",
      //   "Mains 3": "{\"name\":\"Mains 3\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[25,7]}",
      //   "Mains 4": "{\"name\":\"Mains 4\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[35,8]}",
      //   "Mains 5": "{\"name\":\"Mains 5\",\"index\":[\"Load Imbalance\",\"Voltage Imbalance\"],\"data\":[5,2]}",
      // }
      Object.keys(data).map((key, index) => { data[key] = JSON.parse(data[key]) });
      this.data = data;
    });
    this.updateMonth();
  }
  updateMonth() {
    this.apiService
      .getStockChartData(localStorage.getItem('site_slug'))
      .subscribe((data) => {this.typeList2 = data; this.selectedTypes = data[2]});
  }

  onClick() {
    const data = {
      selectedType: this.selectedType.name,
      selectedTypes: this.selectedTypes,
      threshold: this.selectedThreshold ? this.selectedThreshold : 0.95,
      dateRange: this.selectedDate,
    };
    const url =
      location.origin +
      '/deepDiveAnalytics?type=' +
      data.selectedType +
      '&phase=' +
      data.selectedTypes +
      '&threshold=' +
      data.threshold +
      '&start_date=' +
      this.pipe.transform(data.dateRange[0], 'YYYY-MM-dd') +
      '&end_date=' +
      this.pipe.transform(data.dateRange[1], 'YYYY-MM-dd');
    console.log(url);
    window.open(url, '_blank');
  }

  updateType() {}

  showGraph() {
    console.log(this.selectedType);

    if (!this.selectedType || !this.selectedTypes || !this.selectedDate) return;
    // var y = this.selectedTypes.split(' ');
    // y[0] = y[0].split('-')[1];
    // y[0] = y[0].substr(0, y[0].length - 1) + ' 1';
    // const threshold = y.splice(1, 1)[0];
    // console.log(this.pipe.transform(this.selectedDate[1]));

    const data = {
      alert_analyse: this.selectedType.name,
      phase: this.selectedTypes,
      threshold: this.selectedThreshold ? this.selectedThreshold : 0.95,
      site_name: localStorage.getItem('site_slug'),
      start_date:
        this.pipe.transform(this.selectedDate[0], 'YYYY-MM-dd') + ' 00:00:00',
      end_date:
        this.pipe.transform(this.selectedDate[1], 'YYYY-MM-dd') + ' 23:59:59',
    };

    this.apiService.test(data).subscribe((data) => {
      Object.keys(data).map((key, index) => {
        data[key] = JSON.parse(data[key]);
        const x: any = {
          data: data[key].data.map((context: any[]) =>
            context.map((aa) => (+aa ? +aa : 0))
          ),
          columns: data[key].columns,
        };
        console.log(x);
        data[key] = x;
      });
      this.hourlyCostData = data;
      this.show = true;
    });
  }
}
