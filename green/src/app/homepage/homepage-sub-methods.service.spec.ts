import { TestBed, inject } from '@angular/core/testing';

import { HomepageSubMethodsService } from './homepage-sub-methods.service';

describe('HomepageSubMethodsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomepageSubMethodsService]
    });
  });

  it('should be created', inject([HomepageSubMethodsService], (service: HomepageSubMethodsService) => {
    expect(service).toBeTruthy();
  }));
});
