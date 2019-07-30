import { TestBed, inject } from '@angular/core/testing';

import { HighlightsTodayService } from './highlights-today.service';

describe('HighlightsTodayService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HighlightsTodayService]
    });
  });

  it('should be created', inject([HighlightsTodayService], (service: HighlightsTodayService) => {
    expect(service).toBeTruthy();
  }));
});
