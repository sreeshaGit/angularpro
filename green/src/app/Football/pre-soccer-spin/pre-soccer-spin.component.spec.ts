import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSoccerSpinComponent } from './pre-soccer-spin.component';

describe('PreSoccerSpinComponent', () => {
  let component: PreSoccerSpinComponent;
  let fixture: ComponentFixture<PreSoccerSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreSoccerSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSoccerSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
