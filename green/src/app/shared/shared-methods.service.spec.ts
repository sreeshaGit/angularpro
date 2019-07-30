import { TestBed, inject } from '@angular/core/testing';

import { SharedMethodsService } from './shared-methods.service';

describe('SharedMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMethodsService]
    });
  });

  it('should be created', inject([SharedMethodsService], (service: SharedMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
