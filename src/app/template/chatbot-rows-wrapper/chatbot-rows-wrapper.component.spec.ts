import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatbotRowsWrapperComponent } from './chatbot-rows-wrapper.component';

describe('ChatbotRowsWrapperComponent', () => {
  let component: ChatbotRowsWrapperComponent;
  let fixture: ComponentFixture<ChatbotRowsWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatbotRowsWrapperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatbotRowsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
