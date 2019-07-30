import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceHockeyPreSpinComponent } from './ice-hockey-pre-spin.component';

describe('IceHockeyPreSpinComponent', () => {
  let component: IceHockeyPreSpinComponent;
  let fixture: ComponentFixture<IceHockeyPreSpinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceHockeyPreSpinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceHockeyPreSpinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
