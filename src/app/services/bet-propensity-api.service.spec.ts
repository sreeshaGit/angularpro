import { TestBed, inject } from '@angular/core/testing';

import { BetPropensityApiService } from './bet-propensity-api.service';

describe('BetPropensityApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetPropensityApiService]
    });
  });

  it('should be created', inject([BetPropensityApiService], (service: BetPropensityApiService) => {
    expect(service).toBeTruthy();
  }));
});
