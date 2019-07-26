import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsLibraryComponent } from './reports-library.component';

describe('ReportsLibraryComponent', () => {
  let component: ReportsLibraryComponent;
  let fixture: ComponentFixture<ReportsLibraryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsLibraryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
