import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoccerEventComponent } from './soccer-event.component';

describe('SoccerEventComponent', () => {
  let component: SoccerEventComponent;
  let fixture: ComponentFixture<SoccerEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoccerEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoccerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
