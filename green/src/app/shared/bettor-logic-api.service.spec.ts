import { TestBed, inject } from '@angular/core/testing';

import { BettorLogicApiService } from './bettor-logic-api.service';

describe('BettorLogicApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BettorLogicApiService]
    });
  });

  it('should be created', inject([BettorLogicApiService], (service: BettorLogicApiService) => {
    expect(service).toBeTruthy();
  }));
});
