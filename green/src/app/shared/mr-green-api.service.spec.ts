import { TestBed, inject } from '@angular/core/testing';

import { MrGreenApiService } from './mr-green-api.service';

describe('MrGreenApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MrGreenApiService]
    });
  });

  it('should be created', inject([MrGreenApiService], (service: MrGreenApiService) => {
    expect(service).toBeTruthy();
  }));
});
