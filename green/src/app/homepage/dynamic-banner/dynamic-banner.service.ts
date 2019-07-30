import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import { environment } from '../../../environments/environment';

import { HomepageService } from '../homepage.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { MrGreenApiService } from '../../shared/mr-green-api.service';
import { SharedMethodsService } from '../../shared/shared-methods.service';

@Injectable()
export class DynamicBannerService {
    banners = [];
    currentlyDisplayedEventId = new BehaviorSubject<any>(0);
    data: any;
    fallbackImage = 'assets/img/FootballMatch.jpg';

    constructor(
        private homepageService: HomepageService,
        private kambi: KambiService,
        private mrGreenApi: MrGreenApiService,
        private sharedMethods: SharedMethodsService
    ) {
        this.loadBettorlogicBannerData();
        this.loadMrGreenBannerData();

        // refresh bettorlogic data
        // both on interval - and when kambi language changes
        this.kambi.currentLanguage.asObservable().subscribe((lang) => {
            if (lang) {
                this.loadBettorlogicBannerData();
            }
        });
        IntervalObservable.create(environment.refreshLive)
            .subscribe(() => {
                this.loadBettorlogicBannerData();
            });
    }

    /**
     * Get prioritized banner
     * @return {object} banner data
     */
    getBanner() {
        return this.banners.find((banner) => {
            return banner || false;
        });
    }

    /**
     * Format bettorlogics banner data
     * @param {object} bannerData
     * @return {object} formatted banner data
     */
    formatBettorlogicBannerData(bannerData) {
        if (!bannerData) {
            return null;
        }

        let isLive = false;
        let banners = [];
        const rulesData = bannerData.RulesData || {};
        const live = rulesData.Live || {};
        const easibet = rulesData.Easibet || {};
        const fallback = bannerData.Default || {};
        const fallbackEasibet = fallback.Easibet || {};
      

        if (this.isValidArray(live)) {
            isLive = true;
            banners = live;
        } else if (this.isValidArray(easibet)) {         
            banners = easibet;
        } else if (this.isValidArray(fallbackEasibet)) {
            banners = fallbackEasibet;
        } else {
            return null;
        }

        const banner = banners[0];

        return Object.assign({
            hasBetAssist: true,
            hasData: true,
            isLive,
            kickOffTime: banner.kickOfftime
        }, banner);
    }

    /**
     * Format mr green banner data by selecting first available banner
     * @param {object} bannerData
     * @return {object} formatted banner data
     */
    formatMrGreenBannerData(bannerData) {
        if (!bannerData) {
            return null;
        }

        // we use the first available banner
        const banner = bannerData[0];

        return {
            buttonText: banner.button_text,
            ctaLink: banner.link,
            hasBetAssist: false,
            hasData: true,
            image: banner.image || this.fallbackImage,
            isLive: false,
            kickOffTime: banner.event_time * 1000,
            name: banner.title,
            text: banner.subtitle,
            translatedSportName: banner.category_breadcrumb
        };
    }

    /**
     * Check if array is valid
     * @param {any} data
     * @return {bool} is valid array
     */
    isValidArray(data) {
        return this.sharedMethods.validateArray(data);
    }

    /**
     * Load bettorlogic banner data
     */
    loadBettorlogicBannerData() {
        const blBannerId = 3;
        this.homepageService.getBannerDataOnPriority(blBannerId).subscribe(bannerData => {
            const banner = this.formatBettorlogicBannerData(bannerData);

            if (!banner) {
                return;
            }

            this.banners[1] = banner;
            this.currentlyDisplayedEventId.next(banner.eventId);
            this.updateBanner();
        });
    }

    /**
     * Load mr green banner data
     */
    loadMrGreenBannerData() {
        this.mrGreenApi.getTopBanners().subscribe(bannerData => {
            const banner = this.formatMrGreenBannerData(bannerData);

            if (!banner) {
                return;
            }

            this.banners[0] = banner;
            this.updateBanner();
        });
    }

    /**
     * Update banner with latest prioritized data
     */
    updateBanner() {
        this.data = this.getBanner();
    }
}
