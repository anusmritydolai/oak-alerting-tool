import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeepDiveAnalyticsComponent } from './deep-dive-analytics.component';

describe('DeepDiveAnalyticsComponent', () => {
  let component: DeepDiveAnalyticsComponent;
  let fixture: ComponentFixture<DeepDiveAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeepDiveAnalyticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeepDiveAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
