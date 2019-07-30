import { TestBed, inject } from '@angular/core/testing';

import { DisplayTennisImageService } from './display-tennis-image.service';

describe('DisplayTennisImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisplayTennisImageService]
    });
  });

  it('should be created', inject([DisplayTennisImageService], (service: DisplayTennisImageService) => {
    expect(service).toBeTruthy();
  }));
});
