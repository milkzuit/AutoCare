import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookacallComponent } from './bookacall.component';

describe('BookacallComponent', () => {
  let component: BookacallComponent;
  let fixture: ComponentFixture<BookacallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookacallComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookacallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
