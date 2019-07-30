import { TestBed, inject } from '@angular/core/testing';

import { SharedWordsService } from './shared-words.service';

describe('SharedWordsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedWordsService]
    });
  });

  it('should be created', inject([SharedWordsService], (service: SharedWordsService) => {
    expect(service).toBeTruthy();
  }));
});
