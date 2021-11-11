import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertingToolComponent } from './alerting-tool.component';

describe('AlertingToolComponent', () => {
  let component: AlertingToolComponent;
  let fixture: ComponentFixture<AlertingToolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlertingToolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertingToolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
