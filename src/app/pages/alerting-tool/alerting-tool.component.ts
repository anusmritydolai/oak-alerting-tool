import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-alerting-tool',
  templateUrl: './alerting-tool.component.html',
  styleUrls: ['./alerting-tool.component.scss']
})
export class AlertingToolComponent implements OnInit {
  hourlyCostData: any;
  show: boolean = false;
  pipe = new DatePipe('en-GB');

  faCalendar = faCalendarAlt;
  selectedType: string = 'Voltage Imbalance';
  typeList: string[] = [
    'Voltage Imbalance',
    'Load Imbalance',
    'Low Power Factor',
    'Abnormal Change In Energy Con',
  ];
  selectedTypes: string = 'Main 1 L3';
  typeList2: string[] = [
    'Main 1',
    'Main 1 L1',
    'Main 1 L2',
    'Main 1 L3',
  ];
  minDate: Date = new Date();
  maxDate: Date = new Date();
  selectedDate: any = [new Date(), new Date()];
  selectedMonth = {
    month: this.pipe.transform(new Date(), 'MMMM'),
    year: this.pipe.transform(new Date(), 'YYYY')
  };
  constructor() {
    this.minDate.setMonth(this.minDate.getMonth() - 4);
    this.maxDate.setMonth(this.maxDate.getMonth() + 1);
  }

  ngOnInit(): void {}
  updateMonth() {
    console.log(this.selectedDate);
    
    // this.selectedMonth = {
    //   month: this.pipe.transform(this.selectedDate, 'MMMM'),
    //   year: this.pipe.transform(this.selectedDate, 'YYYY')
    // };
  }
  // {{path}}/deepDiveAnalytics?type=Abnormal&phase=Main1&start_date=2021-06-01&end_date=2021-11-10
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
}