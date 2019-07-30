import { TestBed, inject } from '@angular/core/testing';

import { HorseFinderService } from './horse-finder.service';

describe('HorseFinderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HorseFinderService]
    });
  });

  it('should be created', inject([HorseFinderService], (service: HorseFinderService) => {
    expect(service).toBeTruthy();
  }));
});
