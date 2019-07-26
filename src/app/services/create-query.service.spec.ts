import { TestBed, inject } from '@angular/core/testing';

import { CreateQueryService } from './create-query.service';

describe('CreateQueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateQueryService]
    });
  });

  it('should be created', inject([CreateQueryService], (service: CreateQueryService) => {
    expect(service).toBeTruthy();
  }));
});
