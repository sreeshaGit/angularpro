import { TestBed, inject } from '@angular/core/testing';

import { PreSoccerSpinService } from './pre-soccer-spin.service';

describe('PreSoccerSpinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreSoccerSpinService]
    });
  });

  it('should be created', inject([PreSoccerSpinService], (service: PreSoccerSpinService) => {
    expect(service).toBeTruthy();
  }));
});
