import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-alerting-tool',
  templateUrl: './alerting-tool.component.html',
  styleUrls: ['./alerting-tool.component.scss']
})
export class AlertingToolComponent implements OnInit {
  hourlyCostData: any;
  show: boolean = false;
  pipe = new DatePipe('en-GB');
  chart: any;
  faCalendar = faCalendarAlt;
  selectedType?: string;
  typeList: string[] = [
    'Voltage Imbalance',
    'Load Imbalance',
    'Low Power Factor',
    'Abnormal Change In Energy Con',
  ];
  selectedTypes?: string;
  typeList2: string[] = [];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  selectedDate: any = [new Date(), new Date()];
  selectedMonth = {
    month: this.pipe.transform(new Date(), 'MMMM'),
    year: this.pipe.transform(new Date(), 'YYYY')
  };
  stockChartData: any = {};
  selectedGraph: string = '';
  constructor(private apiService: ApiService) {
    this.minDate.setMonth(this.minDate.getMonth() - 4);
    this.maxDate.setMonth(this.maxDate.getMonth());
  }

  ngOnInit(): void {
    this.updateMonth()
  }
  updateMonth() {
    this.apiService.getStockChartData(localStorage.getItem('site_slug')).subscribe(data => this.typeList2 = data)
  }

  onClick() {  
    const data = {
      selectedType: this.selectedType,
      selectedTypes: this.selectedTypes,
      dateRange: this.selectedDate
    }
    const url = location.origin + "/deepDiveAnalytics?type=" + this.selectedType + "&phase=" + this.selectedTypes +
      "&start_date=" + this.pipe.transform(this.selectedDate[0], 'YYYY-MM-dd') + "&end_date=" + this.pipe.transform(this.selectedDate[1], 'YYYY-MM-dd');
    console.log(url);
    window.open(url, "_blank");
  }

  updateType() {

  }

  showGraph() {    
    if(!this.selectedType || !this.selectedTypes || !this.selectedDate) return;
    // var y = this.selectedTypes.split(' ');
    // y[0] = y[0].split('-')[1];
    // y[0] = y[0].substr(0, y[0].length - 1) + ' 1';
    // const threshold = y.splice(1, 1)[0];
    // console.log(this.pipe.transform(this.selectedDate[1]));
    
    const data = {
      alert_analyse: this.selectedType,
      phase: this.selectedTypes,
      threshold: 0.95,
      site_name: localStorage.getItem('site_slug'),
      start_date: this.pipe.transform(this.selectedDate[0], 'YYYY-MM-dd') + ' 00:00:00',
      end_date: this.pipe.transform(this.selectedDate[1], 'YYYY-MM-dd') + ' 23:59:59'
    };
    
    this.apiService.test(data).subscribe(data => {
      Object.keys(data).map((key, index) => {
        data[key] = JSON.parse(data[key])
        const x: any = {data: data[key].data.map((context: any[]) => context.map(aa=>+aa ? +aa : 0)), columns: data[key].columns};
        console.log(x);
        data[key] = x;
      });
      this.hourlyCostData = data;
      this.show = true;
    })
  }
}
