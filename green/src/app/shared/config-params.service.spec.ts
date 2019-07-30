import { TestBed, inject } from '@angular/core/testing';

import { ConfigParamsService } from './config-params.service';

describe('ConfigParamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfigParamsService]
    });
  });

  it('should be created', inject([ConfigParamsService], (service: ConfigParamsService) => {
    expect(service).toBeTruthy();
  }));
});
