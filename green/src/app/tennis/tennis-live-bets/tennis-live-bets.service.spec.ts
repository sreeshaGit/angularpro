import { TestBed, inject } from '@angular/core/testing';

import { TennisLiveBetsService } from './tennis-live-bets.service';

describe('TennisLiveBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TennisLiveBetsService]
    });
  });

  it('should be created', inject([TennisLiveBetsService], (service: TennisLiveBetsService) => {
    expect(service).toBeTruthy();
  }));
});
