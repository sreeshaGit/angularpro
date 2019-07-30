import { TestBed, inject } from '@angular/core/testing';

import { IceHockeyPreSpinService } from './ice-hockey-pre-spin.service';

describe('IceHockeyPreSpinService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IceHockeyPreSpinService]
    });
  });

  it('should be created', inject([IceHockeyPreSpinService], (service: IceHockeyPreSpinService) => {
    expect(service).toBeTruthy();
  }));
});
