import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballLiveBetsComponent } from './football-live-bets.component';

describe('FootballLiveBetsComponent', () => {
  let component: FootballLiveBetsComponent;
  let fixture: ComponentFixture<FootballLiveBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballLiveBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballLiveBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
