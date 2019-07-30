import { TestBed, inject } from '@angular/core/testing';

import { HomeTennisLiveScoreService } from './home-tennis-live-score.service';

describe('HomeTennisLiveScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeTennisLiveScoreService]
    });
  });

  it('should be created', inject([HomeTennisLiveScoreService], (service: HomeTennisLiveScoreService) => {
    expect(service).toBeTruthy();
  }));
});
