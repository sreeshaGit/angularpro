import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTennisLiveScoreComponent } from './home-tennis-live-score.component';

describe('HomeTennisLiveScoreComponent', () => {
  let component: HomeTennisLiveScoreComponent;
  let fixture: ComponentFixture<HomeTennisLiveScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTennisLiveScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTennisLiveScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
