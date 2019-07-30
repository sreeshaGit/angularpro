/**
 * @fileoverview contains the logic to display carousel.
 */
import { Component, OnInit, Injectable, OnDestroy, Input, AfterViewInit } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/observable/timer';
import { Observable } from 'rxjs/Observable';

import { ProductCarouselService } from './product-carousel.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
import { environment } from '../../../environments/environment';
import Flickity from 'flickity';

@Component({
    selector: 'app-product-carousel',
    templateUrl: './product-carousel.component.html',
    styleUrls: ['./product-carousel.component.css'],
    providers: [ProductCarouselService]
})
export class ProductCarouselComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    bestBetsPopUp: boolean;
    carouselData: any;
    fbLiveCount = 0;
    horseFinderPopUp: boolean;
    isLoading = true;
    isModalOpen: boolean;
    liveBestBetsPopUp: boolean;
    liveSoccerSpinPopUp: boolean;
    liveTennisPopUp: boolean;
    multiBetPopUp: boolean;
    productCarousel: any;
    preSoccerSpinPopUp: boolean;
    tennisBestBetsPopUp: boolean;
    preIceHockeySpinPopUp: boolean;
    @Input() staticWord;

    /**
     *
     * @param {ProductCarouselService} productCarouselService - instance of  product carousel service.
     * @param {HomepageSubMethodsService} homePageSubMethodsService - instance of HomepageSubMethodsService to access its methods.
     * @param {KambiService} kambiService -instance of kambiservice.
     */
    constructor(
        private productCarouselService: ProductCarouselService,
        public homePageSubMethodsService: HomepageSubMethodsService,
        public kambiService: KambiService
    ) { }

    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.getCombiSpinData();

            this.kambiService.currentLanguage.asObservable().subscribe(() => {
                this.getCarousel();
            });
        }
    }

    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshMin)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getCarousel();
            });
        IntervalObservable.create(environment.refreshLive)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.getCombiSpinData();
            });
    }

    /**
     * This fuction is to get data to carousel items.
     */
    getCarousel() {
        this.productCarouselService.getCarouselData().subscribe(resData => {
            this.isLoading = false;
            if (resData !== null && Array.isArray(resData) && resData.length > 0) {
                const carouselData = resData;
                carouselData.sort(function (item1, item2) {
                    return item1.orderId - item2.orderId;
                });
                this.carouselData = carouselData;               
            }

            this.loadProductsCarousel();
        });
    }

    /**
     * This fuction is to get data of combi spin.
     */
    getCombiSpinData() {
        this.productCarouselService.getSpinData().subscribe(resData => {
            if (resData.liveEvents && Array.isArray(resData.liveEvents)) {
                this.fbLiveCount = resData.liveEvents.reduce((sum, val) => {
                    sum += val.event.sport === 'FOOTBALL' ? 1 : 0;
                    return sum;
                }, 0);
            }
        });
    }

    /**
     * This function is to display products carousel dynamically.
     */
    loadProductsCarousel() {
        Observable.timer(500).subscribe(() => {
            if (this.productCarousel) {
                this.productCarousel.destroy();
            }

            this.productCarousel = new Flickity('.BL-flickity-carousel', {
                freeScroll: true,
                cellAlign: 'left',
                contain: true,
                prevNextButtons: false,
                pageDots: false,
                imagesLoaded: true,
                setGallerySize: false,
            });
        });
    }

    /**
     * This function navigates to corresponding page.
     * @param productId - productId of the popup to be sent.
     */
    goToPage(productId) {
        this.isModalOpen = true;
        this.homePageSubMethodsService.goToPopUp(productId, (data) => {
            this.liveSoccerSpinPopUp = data.liveSoccerSpinPopUp;
            this.liveBestBetsPopUp = data.liveBestBetsPopUp;
            this.multiBetPopUp = data.multiBetPopUp;
            this.bestBetsPopUp = data.bestBetsPopUp;
            this.horseFinderPopUp = data.horseFinderPopUp;
            this.preSoccerSpinPopUp = data.preSoccerSpinPopUp;
            this.tennisBestBetsPopUp = data.tennisBestBetsPopUp;
            this.liveTennisPopUp = data.liveTennisPopUp;
            this.preIceHockeySpinPopUp = data.preIceHockeySpinPopUp;
        });
    }
    /**
     * This function used to show pop-up.
     * @param event - boolean value.
     */
    modalPopupClosedCallback(event) {
        if (event === false) {
            this.isModalOpen = false;
        }
    }

    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
