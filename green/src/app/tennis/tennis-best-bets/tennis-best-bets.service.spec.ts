import { TestBed, inject } from '@angular/core/testing';

import { TennisBestBetsService } from './tennis-best-bets.service';

describe('TennisBestBetsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TennisBestBetsService]
    });
  });

  it('should be created', inject([TennisBestBetsService], (service: TennisBestBetsService) => {
    expect(service).toBeTruthy();
  }));
});
