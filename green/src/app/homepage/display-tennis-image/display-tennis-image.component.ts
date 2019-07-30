/**
 * @fileoverview contains all logic for for home page tennis image display.
 */
import { Component, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeWhile';

import { environment } from '../../../environments/environment';
import { DisplayTennisImageService } from './display-tennis-image.service';
@Component({
    selector: 'app-display-tennis-image',
    templateUrl: './display-tennis-image.component.html',
    styleUrls: ['./display-tennis-image.component.css'],
    providers: [DisplayTennisImageService]
})
export class DisplayTennisImageComponent implements OnInit, OnDestroy, AfterViewInit {
    private alive = true;
    participantFlag: any;
    @Input() eventId;
    @Input() flagPosition;
    @Input() isLive;

    /**
     * @param {DisplayTennisImageService} displayTennisImageService - instance of display Tennis image service to access its methods.
     */
    constructor(private displayTennisImageService: DisplayTennisImageService) {
        this.participantFlag = displayTennisImageService.fallbackFlag;
    }

    /**
     * This function calls initial and gets data.
     */
    ngOnInit() {
        if (this.alive) {
            this.getTennisImage();
        }
    }

    /**
     * This function calls after a component's view.
     */
    ngAfterViewInit() {
        IntervalObservable.create(environment.refreshLive)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.getTennisImage();
            });
    }

    /**
     * This function get the info of tennie player participantId.
     */
    getTennisImage() {
        if (this.isLive) {
            this.getLiveTennisFlag();
        } else {
            this.getPregameTennisFlag();
        }
    }

    /**
     * This function gets data of pregame tennis flags.
     */
    getPregameTennisFlag() {
        this.displayTennisImageService.getTennisPregameFromMg().subscribe(resData => {
            const eventId = parseInt(this.eventId, 10);
            for (const data of resData.events) {
                if (data.id === eventId && Array.isArray(data.participants)) {
                    for (const participantsData of data.participants) {
                        if (this.flagPosition === 'home' &&
                            participantsData.name === data.homeName) {
                            this.getTennisPlayerCountryName(participantsData.participantId);
                        } else if (this.flagPosition === 'away' &&
                            participantsData.name === data.awayName) {
                            this.getTennisPlayerCountryName(participantsData.participantId);
                        }
                    }
                }
            }
        });
    }

    /**
     * This function gets data of live tennis flags.
     */
    getLiveTennisFlag() {
        this.displayTennisImageService.getTennisMgData().subscribe(resData => {
            const eventId = parseInt(this.eventId, 10);
            if (Array.isArray(resData.liveEvents) && resData.liveEvents.length > 0) {
                resData.liveEvents.forEach((obj, index) => {
                    if (resData.liveEvents[index].liveData.eventId === eventId) {
                        const data = resData.liveEvents[index].liveData;
                        for (const participantsData of resData.liveEvents[index].event.participants) {
                            if (this.flagPosition === 'home' &&
                                resData.liveEvents[index].event.homeName === participantsData.name) {
                                this.getTennisPlayerCountryName(participantsData.participantId);
                            } else if (this.flagPosition === 'away' &&
                                resData.liveEvents[index].event.awayName === participantsData.name) {
                                this.getTennisPlayerCountryName(participantsData.participantId);
                            }
                        }
                    }
                });
            }
        });
    }

    /**
     * This function subscribes to service and get the data of tennis player country info.
     * @param {number} participantId: participantId to get correspinding country name.
     */
    getTennisPlayerCountryName(participantId) {
        this.displayTennisImageService.getTennisPlayerCountry(participantId).subscribe(flag => {
            this.participantFlag = flag;
        });
    }

    /**
     * This function called before destroying the component.
     */
    ngOnDestroy() {
        this.alive = false;
    }
}
