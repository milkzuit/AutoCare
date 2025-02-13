import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearlyChartComponent } from './yearly-chart.component';

describe('YearlyChartComponent', () => {
  let component: YearlyChartComponent;
  let fixture: ComponentFixture<YearlyChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [YearlyChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YearlyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
