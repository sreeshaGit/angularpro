import { TestBed, inject } from '@angular/core/testing';

import { LiveSoccerSpinService } from './live-soccer-spin.service';

describe('LiveSoccerSpinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveSoccerSpinService]
    });
  });

  it('should be created', inject([LiveSoccerSpinService], (service: LiveSoccerSpinService) => {
    expect(service).toBeTruthy();
  }));
});
