import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  hourlyCostData: any;
  show: boolean = false;
  selectedType : string = 'Voltage Imbalance';
  typeList: string[] = [
    'Voltage Imbalance',
    'Voltage Imbalance',
    '30-08-21 to 24-09-21',
  ];
  constructor() { }

  ngOnInit(): void {
  }
  
}
