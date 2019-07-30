import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TennisLiveScoreComponent } from './tennis-live-score.component';

describe('TennisLiveScoreComponent', () => {
  let component: TennisLiveScoreComponent;
  let fixture: ComponentFixture<TennisLiveScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TennisLiveScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TennisLiveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
