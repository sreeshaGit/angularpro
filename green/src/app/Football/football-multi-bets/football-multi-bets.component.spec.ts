import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FootballMultiBetsComponent } from './football-multi-bets.component';

describe('FootballMultiBetsComponent', () => {
  let component: FootballMultiBetsComponent;
  let fixture: ComponentFixture<FootballMultiBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FootballMultiBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FootballMultiBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
