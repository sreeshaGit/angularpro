import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisBestBetsComponent } from './tennis-best-bets.component';

describe('TennisBestBetsComponent', () => {
  let component: TennisBestBetsComponent;
  let fixture: ComponentFixture<TennisBestBetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisBestBetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisBestBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
