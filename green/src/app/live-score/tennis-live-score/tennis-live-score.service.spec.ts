import { TestBed, inject } from '@angular/core/testing';

import { TennisLiveScoreService } from './tennis-live-score.service';

describe('TennisLiveScoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TennisLiveScoreService]
    });
  });

  it('should be created', inject([TennisLiveScoreService], (service: TennisLiveScoreService) => {
    expect(service).toBeTruthy();
  }));
});
