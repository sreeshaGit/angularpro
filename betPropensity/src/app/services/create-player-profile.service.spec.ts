import { TestBed, inject } from '@angular/core/testing';

import { CreatePlayerProfileService } from './create-player-profile.service';

describe('CreatePlayerProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePlayerProfileService]
    });
  });

  it('should be created', inject([CreatePlayerProfileService], (service: CreatePlayerProfileService) => {
    expect(service).toBeTruthy();
  }));
});
