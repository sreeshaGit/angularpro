import { TestBed, inject } from '@angular/core/testing';

import { FootballBestBetsService } from './football-best-bets.service';

describe('FootballBestBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballBestBetsService]
    });
  });

  it('should be created', inject([FootballBestBetsService], (service: FootballBestBetsService) => {
    expect(service).toBeTruthy();
  }));
});
