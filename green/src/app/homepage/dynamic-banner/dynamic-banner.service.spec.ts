import { TestBed, inject } from '@angular/core/testing';

import { DynamicBannerService } from './dynamic-banner.service';

describe('DynamicBannerService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DynamicBannerService]
        });
    });

    it('should be created', inject([DynamicBannerService], (service: DynamicBannerService) => {
        expect(service).toBeTruthy();
    }));
});
