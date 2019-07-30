import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetNumberComponent } from './bet-number.component';

describe('BetNumberComponent', () => {
  let component: BetNumberComponent;
  let fixture: ComponentFixture<BetNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
