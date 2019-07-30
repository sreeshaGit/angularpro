import { TestBed, inject } from '@angular/core/testing';

import { ProductCarouselService } from './product-carousel.service';

describe('ProductCarouselService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductCarouselService]
    });
  });

  it('should be created', inject([ProductCarouselService], (service: ProductCarouselService) => {
    expect(service).toBeTruthy();
  }));
});
