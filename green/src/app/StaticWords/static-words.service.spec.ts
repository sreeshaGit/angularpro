import { TestBed, inject } from '@angular/core/testing';

import { StaticWordsService } from './static-words.service';

describe('StaticWordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StaticWordsService]
    });
  });

  it('should be created', inject([StaticWordsService], (service: StaticWordsService) => {
    expect(service).toBeTruthy();
  }));
});
