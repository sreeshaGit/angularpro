import { TestBed, inject } from '@angular/core/testing';

import { LiveOddsService } from './live-odds.service';

describe('LiveOddsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveOddsService]
    });
  });

  it('should be created', inject([LiveOddsService], (service: LiveOddsService) => {
    expect(service).toBeTruthy();
  }));
});
