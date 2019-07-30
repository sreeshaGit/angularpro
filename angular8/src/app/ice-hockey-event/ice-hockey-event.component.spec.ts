import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IceHockeyEventComponent } from './ice-hockey-event.component';

describe('IceHockeyEventComponent', () => {
  let component: IceHockeyEventComponent;
  let fixture: ComponentFixture<IceHockeyEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IceHockeyEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IceHockeyEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
