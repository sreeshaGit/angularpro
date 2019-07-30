import { TestBed, inject } from '@angular/core/testing';

import { FootballMultiBetsService } from './football-multi-bets.service';

describe('FootballMultiBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootballMultiBetsService]
    });
  });

  it('should be created', inject([FootballMultiBetsService], (service: FootballMultiBetsService) => {
    expect(service).toBeTruthy();
  }));
});
