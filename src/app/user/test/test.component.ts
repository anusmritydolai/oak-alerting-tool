import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
})
export class TestComponent implements OnInit {
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

  onClick() {
    const data = {
      // name: "test",
      // email: "test@example.com"
      data: [49.9, 106.4, 60.2, 104.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      dateRange: this.selectedDate
    }
    const url = location.origin + "/data?data=" + JSON.stringify(data);
    console.log(url);
    window.open(url, "_blank");
  }
}
