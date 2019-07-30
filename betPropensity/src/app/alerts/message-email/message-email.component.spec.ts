import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageEmailComponent } from './message-email.component';

describe('MessageEmailComponent', () => {
  let component: MessageEmailComponent;
  let fixture: ComponentFixture<MessageEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
