import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodaysAssistComponent } from './todays-assist.component';

describe('TodaysAssistComponent', () => {
  let component: TodaysAssistComponent;
  let fixture: ComponentFixture<TodaysAssistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodaysAssistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodaysAssistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
