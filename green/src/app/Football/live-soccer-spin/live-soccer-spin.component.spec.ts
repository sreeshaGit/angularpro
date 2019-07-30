import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveSoccerSpinComponent } from './live-soccer-spin.component';

describe('LiveSoccerSpinComponent', () => {
  let component: LiveSoccerSpinComponent;
  let fixture: ComponentFixture<LiveSoccerSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveSoccerSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveSoccerSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
