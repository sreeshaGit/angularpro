import { TestBed, inject } from '@angular/core/testing';

import { CreateReportService } from './create-report.service';

describe('CreateReportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateReportService]
    });
  });

  it('should be created', inject([CreateReportService], (service: CreateReportService) => {
    expect(service).toBeTruthy();
  }));
});
