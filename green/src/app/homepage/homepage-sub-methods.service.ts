/**
 * @fileoverview contains all sub functions of home page.
 */
import { Injectable } from '@angular/core';
import { AnalyticsService } from '../shared/analytics.service';
import { KambiService } from '../Kambi/Kambi.service';
import { environment } from '../../environments/environment';
@Injectable()
export class HomepageSubMethodsService {
    /**
     *
     * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
     * @param {AnalyticsService} analytics - instance of AnalyticsService to send analytics.
     */
    constructor(public analytics: AnalyticsService, public kambiService: KambiService) {}
    /**
     * This fuction used to add to betslip.
     * @param outcome - this hold the eventId of that match.
     * @param typeofclick - this hold data from where it is clicked.
     */
    addToBetslipGA(outcome, typeOfClick) {
        switch (typeOfClick) {
            case 'banner':
                this.analytics.sendAnalytics('MrGreen.Banner', 'Banner.OddsClick', outcome);
                break;
            case 'upcoming':
                this.analytics.sendAnalytics('MrGreen.UpComing', 'Upcoming.OddsClick', outcome);
                break;
            case 'rightnow':
                this.analytics.sendAnalytics('MrGreen.RightNow', 'RightNow.OddsClick', outcome);
                break;
            case 'matchoftheday':
                this.analytics.sendAnalytics('MrGreen.MatchOfTheDay', 'MatchOfTheDay.OddsClick', outcome);
                break;
            case 'highlight':
                this.analytics.sendAnalytics('MrGreen.HighlightsToday', 'Highlights.OddsClick', outcome);
                break;
            case 'todaysassist':
                this.analytics.sendAnalytics('MrGreen.TodayAssist', 'TodayAssist.OddsClick', outcome);
        }
    }
    /**
    * This fuction used to navigate to event page.
    * @param eventId - this hold the eventId of that match.
    * @param typeOfEvent -this hold data from where it is clicked.
    */
    eventGA(eventId, typeOfEvent) {
        switch (typeOfEvent) {
            case 'rightnow':
                this.analytics.sendAnalytics('MrGreen.RightNow', 'RightNow.ImageClick', eventId);
                break;
            case 'matchoftheday':
                this.analytics.sendAnalytics('MrGreen.MatchOfTheDay', 'MatchOFTheDay.ImageClick', eventId);
                break;
            case 'upcoming':
                this.analytics.sendAnalytics('MrGreen.UpComing', 'Upcoming.ImageClick', eventId);
                break;
            case 'highlight':
                this.analytics.sendAnalytics('MrGreen.HighlightsToday', 'Highlight.EventClick', eventId);
                break;
            case 'todaysassist':
                this.analytics.sendAnalytics('MrGreen.TodayAssist', 'TodayAssist.EventClick', eventId);
                break;
            case 'banner':
                this.analytics.sendAnalytics('MrGreen.Banner', 'Banner.EventCLick', eventId);
        }
    }
    /**
     * This function used to get the selected popup to display.
     * @param productId - this productId is used to get to that product.
     * @param callback
     */
    goToPopUp(productId, callback: (data) => void) {
        let bestBetsPopUp: boolean;
        let multiBetPopUp: boolean;
        let liveBestBetsPopUp: boolean;
        let preSoccerSpinPopUp: boolean;
        let liveSoccerSpinPopUp: boolean;
        let liveTennisPopUp: boolean;
        let horseFinderPopUp: boolean;
        let tennisBestBetsPopUp: boolean;
        let preIceHockeySpinPopUp: boolean;
        switch (productId) {
            case 1:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'LiveFootballCombiSpin', '');
                liveSoccerSpinPopUp = true;
                break;
            case 3:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'LiveFootballAssists', '');
                liveBestBetsPopUp = true;
                break;
            case 4:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'LiveTennis', '');
                liveTennisPopUp = true;
                break;
            case 5:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'Multibet', '');
                multiBetPopUp = true;
                break;
            case 6:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'FootballTopAssists', '');
                bestBetsPopUp = true;
                break;
            case 7:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'TennisTopBets', '');
                tennisBestBetsPopUp = true;
                break;
            case 8:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'HorseFinder', '');
                horseFinderPopUp = true;
                break;
            case 9:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'FootballCombiSpin', '');
                preSoccerSpinPopUp = true;
                break;
            case 10:
                this.analytics.sendAnalytics(environment.widgetsCategories.carousel, 'IceHockeyPreSpin', '');
                preIceHockeySpinPopUp = true;
                break;
        }

        callback({
            liveSoccerSpinPopUp: liveSoccerSpinPopUp,
            liveBestBetsPopUp: liveBestBetsPopUp,
            multiBetPopUp: multiBetPopUp,
            bestBetsPopUp: bestBetsPopUp,
            horseFinderPopUp: horseFinderPopUp,
            preSoccerSpinPopUp: preSoccerSpinPopUp,
            tennisBestBetsPopUp: tennisBestBetsPopUp,
            liveTennisPopUp: liveTennisPopUp,
            preIceHockeySpinPopUp: preIceHockeySpinPopUp
        });
    }
    /**
     * This fuction used to navigate to event page.
     * @param eventId - this hold the eventId of that match.
     * @param typeOfEvent -this hold data from where it is clicked.
     */
    goToEventPage(eventId, typeOfEvent) {
        if (eventId) {
            this.eventGA(eventId, typeOfEvent);
            this.kambiService.navigateToEvent(eventId);
        }
    }
}
