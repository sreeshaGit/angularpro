/**
 * @fileoverview contains all the logic to display upcoming match.
 */
import { Component, Input } from '@angular/core';

import { KambiService } from '../../Kambi/Kambi.service';
import { HomepageSubMethodsService } from '../homepage-sub-methods.service';
@Component({
  selector: 'app-upcoming-match',
  templateUrl: './upcoming-match.component.html',
  styleUrls: ['./upcoming-match.component.css']
})
export class UpcomingMatchComponent {
    @Input() matchUpcoming;
    @Input() staticWord;
    @Input() showUpcoming;
    @Input() isUpcomingLoader;
    isUpcomingImage = true;

     /**
      * @param kambiService -instance of kambi service.
      * @param HomePageSubMethodsService -instance of HomepageSubMethodsService to access its methods.
      */
    constructor(public kambiService: KambiService,
                public homePageSubMethodsService: HomepageSubMethodsService) { }
    /**
     * This fuction used to add to betslip.
     * @param outcome - this hold the eventId of that match.
     * @param typeOfClick - this hold data from where it is clicked.
     */
    addToBetslip(outcome, typeOfClick) {
        this.homePageSubMethodsService.addToBetslipGA(outcome, typeOfClick);
        this.kambiService.addToBetslip([outcome], 'single');
    }
    /**
     * This fuction used to navigate to event page.
     * @param eventId - this hold the eventId of that match.
     * @param typeOfEvent -this hold data from where it is clicked.
     */
    goToEventPage(eventId, typeOfEvent) {
        this.homePageSubMethodsService.goToEventPage(eventId, typeOfEvent);
    }
    /**
     *  If there is no jersey then it removes the other.
     */
    imageError() {
        this.isUpcomingImage = false;
    }
}
