import { TestBed } from '@angular/core/testing';

import { WidgetApiService } from './widget-api.service';

describe('WidgetApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WidgetApiService = TestBed.get(WidgetApiService);
    expect(service).toBeTruthy();
  });
});
