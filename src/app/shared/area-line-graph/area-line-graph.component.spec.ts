import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaLineGraphComponent } from './area-line-graph.component';

describe('AreaLineGraphComponent', () => {
  let component: AreaLineGraphComponent;
  let fixture: ComponentFixture<AreaLineGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaLineGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaLineGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
