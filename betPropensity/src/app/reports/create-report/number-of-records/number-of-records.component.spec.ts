import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberOfRecordsComponent } from './number-of-records.component';

describe('NumberOfRecordsComponent', () => {
  let component: NumberOfRecordsComponent;
  let fixture: ComponentFixture<NumberOfRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumberOfRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberOfRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
