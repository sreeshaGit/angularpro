import { TestBed, inject } from '@angular/core/testing';

import { FootballLiveBetsService } from './football-live-bets.service';

describe('FootballLiveBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballLiveBetsService]
    });
  });

  it('should be created', inject([FootballLiveBetsService], (service: FootballLiveBetsService) => {
    expect(service).toBeTruthy();
  }));
});
