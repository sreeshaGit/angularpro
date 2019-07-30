import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetCardsComponent } from './bet-cards.component';

describe('BetCardsComponent', () => {
  let component: BetCardsComponent;
  let fixture: ComponentFixture<BetCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
