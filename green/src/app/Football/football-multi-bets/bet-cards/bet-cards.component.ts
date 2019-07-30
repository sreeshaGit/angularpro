/**
 * @fileoverview  This component contains logic for bet cards.
 */
import { Component, Input } from '@angular/core';

import { KambiService } from '../../../Kambi/Kambi.service';
import { FootballMultiBetsComponent } from '../football-multi-bets.component';
@Component({
  selector: 'app-bet-cards',
  templateUrl: './bet-cards.component.html',
  styleUrls: ['./bet-cards.component.css'],

})
export class BetCardsComponent  {
    @Input() replaceEventId;
    @Input() item;
    @Input() row;
    @Input() col;
    /**
     *
     * @param kambiService  - instance of KambiService to access kambi methods.
     * @param footballMultiBetsComponent -instance of multibet component to access funtions.
     */
    constructor(public kambiService: KambiService, private footballMultiBetsComponent: FootballMultiBetsComponent) { }
    /**
     * This function replaces the bets.
     * @param {number} multiGroupId - its refer multibet group id of that bet.
     * @param { number } row- it refer row number.
     * @param {number} col - it refer column number.
     * @param eventID -evenyt id of that bet.
     */
    replaceBet(multiGroupId, row, col, eventID) {
        this.footballMultiBetsComponent.replaceBet(multiGroupId, row, col, eventID);
    }
}
