import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetFoldComponent } from './bet-fold.component';

describe('BetFoldComponent', () => {
  let component: BetFoldComponent;
  let fixture: ComponentFixture<BetFoldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetFoldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetFoldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
