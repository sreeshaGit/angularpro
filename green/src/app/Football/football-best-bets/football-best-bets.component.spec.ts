import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballBestBetsComponent } from './football-best-bets.component';

describe('FootballBestBetsComponent', () => {
  let component: FootballBestBetsComponent;
  let fixture: ComponentFixture<FootballBestBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballBestBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballBestBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
