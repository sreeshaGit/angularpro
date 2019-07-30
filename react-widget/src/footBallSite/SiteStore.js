/*This file contains logic of initial load of widgets */
import { observable, extendObservable } from 'mobx';
import superagent from 'superagent';
import ENV from '../common/environment.json';
import { findLanguage } from '../common/commonFunctions.js';

class SiteStore {
    @observable activeIndex = 0;
    @observable staticData = [];
    constructor() {
        extendObservable(this, {
            activeInd: 0,
            lang: 'en',
            getodds: [],
            hideBestBets: false,
            hidePopularBets: false,
            hideAccaAttack: false,
            hideLiveBets: false,
            callServcies: true,
            carouselItemNames: [
                {
                    display: "",
                    Name: ""
                }
            ]
        });
    }

    /**
     * This function is used to display the direction of carousel.
     * @param {index} direction
    */
    clickArrow(direction) {
        var index = this.activeIndex;
        var carouselItemsState = [
            {
                display: false,
                Name: "Live Bets"
            },
            {
                display: false,
                Name: "Best Bets"
            },
            {
                display: false,
                Name: "Popular Bets"
            },
            {
                display: false,
                Name: "Acca Attack"
            }
        ];
        carouselItemsState.map((item) => {
            if (item.Name == "Live Bets" && !this.hideLiveBets) {
                item.display = true;
            }
            else if (item.Name == "Best Bets" && !this.hideBestBets) {
                item.display = true;
            }
            else if (item.Name == "Popular Bets" && !this.hidePopularBets) {
                item.display = true;
            }
            else if (item.Name == "Acca Attack" && !this.hideAccaAttack) {
                item.display = true;
            }
        })

        var carouselItemNames = carouselItemsState.filter(function (d) {
            if (d.display == true) {
                return d.Name;
            }
        });
        this.carouselItemNames = carouselItemNames;
        if (direction === 'next') {
            if (index < this.carouselItemNames.length - 1) {
                index += 1;
            }
        }
        if (direction === 'prev') {
            if (index > 0) {
                index -= 1;
            }
        }
        this.activeIndex = index;
    }

    lookCarouselNames() {
        var carouselItemsState = [
            {
                display: false,
                Name: "Live Bets"
            },
            {
                display: false,
                Name: "Best Bets"
            },
            {
                display: false,
                Name: "Popular Bets"
            },
            {
                display: false,
                Name: "Acca Attack"
            }
        ];
        carouselItemsState.map((item) => {
            if (item.Name == "Live Bets" && !this.hideLiveBets) {
                item.display = true;
            }
            else if (item.Name == "Best Bets" && !this.hideBestBets) {
                item.display = true;
            }
            else if (item.Name == "Popular Bets" && !this.hidePopularBets) {
                item.display = true;
            }
            else if (item.Name == "Acca Attack" && !this.hideAccaAttack) {
                item.display = true;
            }
        });
        var carouselItemNames = carouselItemsState.filter(function (d) {
            if (d.display == true) {
                return d.Name;
            }
        });
        this.carouselItemNames = carouselItemNames;
    }

    /**
     * This function is used to get sataic data service.
    */
    getStaticData() {
        const staticurl = ENV.serviceURL + 'StaticKeywords/Football/FootballService.svc/GetStaticDataByLanguage' + '?' + 'lang=' + findLanguage();
        superagent
            .get(staticurl)
            .query(null)
            .set('Accept', 'application/json')
            .end((error, response) => {
                const result = response.body
                this.staticData = result;
            })
    }

    /**
     * This function is used to get active index.
    */
    getActiveIndex() {
        return this.activeIndex;
    }

}
export default SiteStore;