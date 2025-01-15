import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallBookingComponent } from './call-booking.component';

describe('CallBookingComponent', () => {
  let component: CallBookingComponent;
  let fixture: ComponentFixture<CallBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CallBookingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
