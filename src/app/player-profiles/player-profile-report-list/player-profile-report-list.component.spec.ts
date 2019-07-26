import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerProfileReportListComponent } from './player-profile-report-list.component';

describe('PlayerProfileReportListComponent', () => {
  let component: PlayerProfileReportListComponent;
  let fixture: ComponentFixture<PlayerProfileReportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerProfileReportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerProfileReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
