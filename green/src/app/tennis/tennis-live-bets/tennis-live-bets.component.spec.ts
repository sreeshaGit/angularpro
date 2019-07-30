import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisLiveBetsComponent } from './tennis-live-bets.component';

describe('TennisLiveBetsComponent', () => {
  let component: TennisLiveBetsComponent;
  let fixture: ComponentFixture<TennisLiveBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisLiveBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisLiveBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
