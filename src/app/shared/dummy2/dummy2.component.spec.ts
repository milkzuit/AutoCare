import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dummy2Component } from './dummy2.component';

describe('Dummy2Component', () => {
  let component: Dummy2Component;
  let fixture: ComponentFixture<Dummy2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Dummy2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Dummy2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
