import { Component, Input } from '@angular/core';

import { FootballMultiBetsComponent } from '../football-multi-bets.component';
@Component({
  selector: 'app-multibet-footer',
  templateUrl: './multibet-footer.component.html',
  styleUrls: ['./multibet-footer.component.css']
})
export class MultibetFooterComponent  {
    @Input() subArrayOfMultiBets;
    @Input() totalOdds;
    @Input() totalOddsText;
    @Input() addAllToBetslipText;
    /**
     *
     * @param footballMultiBetsComponent -instance of multibet component.
     */
    constructor(private footballMultiBetsComponent: FootballMultiBetsComponent) { }
    /**
     * this function call multibet add all to betslip function.
     */
    addToBetslip() {
        this.footballMultiBetsComponent.addToBetslip();
    }
}
