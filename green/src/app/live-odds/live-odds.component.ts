/**
 * @fileoverview contains all logic to get odds from service.
 */
import { Component, Injectable, OnInit, AfterViewInit, OnDestroy, Input } from '@angular/core';

import { KambiService } from '../Kambi/Kambi.service';
import { LiveOddsService } from './live-odds.service';
@Component({
  selector: 'app-live-odds',
  templateUrl: './live-odds.component.html',
  styleUrls: ['./live-odds.component.css']
})
export class LiveOddsComponent implements OnInit, OnDestroy , AfterViewInit {
    private alive = true;
    interval: any;
    odds = {};
    @Input() eventId;
    @Input() marketId;
    @Input() outcomeId;
    /**
     *
     * @param {LiveOddsService} liveOddsService - instance of LiveOddsService to access its methods.
     */
     constructor(private liveOddsService: LiveOddsService, public kambiService: KambiService) { }
    /**
     * This function calls initially and gets data.
     */
     ngOnInit() {
        const self = this;
        if (this.alive) {
            this.liveOddsService.getLiveOdds(this.eventId)
                .subscribe(resData => {
                    const odds = this.liveOddsService.getOdds(this.marketId, this.outcomeId, resData.betoffers);
                    this.odds = odds;
                });
        }
    }
    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        if (this.alive) {
            this.interval = setInterval(() => { this.ngOnInit(); }, 5000);
        }
    }
    /**
     * This function called before destroying  the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
