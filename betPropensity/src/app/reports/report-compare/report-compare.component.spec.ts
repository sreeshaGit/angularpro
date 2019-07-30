import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCompareComponent } from './report-compare.component';

describe('ReportCompareComponent', () => {
  let component: ReportCompareComponent;
  let fixture: ComponentFixture<ReportCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
