import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisEventComponent } from './tennis-event.component';

describe('TennisEventComponent', () => {
  let component: TennisEventComponent;
  let fixture: ComponentFixture<TennisEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
