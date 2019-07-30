import { Component, OnInit } from '@angular/core';
import { DynamicBannerService } from './dynamic-banner.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';

@Component({
    selector: 'app-dynamic-banner',
    templateUrl: './dynamic-banner.component.html',
    styleUrls: ['./dynamic-banner.component.css']
})
export class DynamicBannerComponent implements OnInit {
    constructor(
        public dynamicBanner: DynamicBannerService,
        public homepageMethods: HomepageSubMethodsService,
        public kambi: KambiService,
        public staticWordsData: StaticWordsService
    ) {}

    ngOnInit() {
    }

    /**
     * Triggered when the main CTA button is clicked
     * @param eventData data related to clicked event
     */
    mainCTAClicked(eventData) {
        const outcome = eventData.outcomeId;
        const ctaLink = eventData.ctaLink;

        if (outcome) {
            this.homepageMethods.addToBetslipGA(outcome, 'banner');
            this.kambi.addToBetslip([outcome], 'single');
        } else if (ctaLink) {
            parent.postMessage({
                url: ctaLink,
                type: 'http.navigate'
            }, '*');
        }
    }

    /**
     * Navigate to an event page
     * @param eventId - eventId of that match
     */
    goToEventPage(eventId) {
        if (eventId) {
            this.homepageMethods.goToEventPage(eventId, 'banner');
        }
    }
}
