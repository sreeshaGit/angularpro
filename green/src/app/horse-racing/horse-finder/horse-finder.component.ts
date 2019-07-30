/**
 * @fileoverview contains all logic for horse finder.
 */
import { Component, ElementRef, OnInit, OnDestroy} from '@angular/core';
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';

import { HorseFinderService } from './horse-finder.service';
import { KambiService } from '../../Kambi/Kambi.service';
import { StaticWordsService } from '../../StaticWords/static-words.service';
import { AnalyticsService } from '../../shared/analytics.service';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-horse-finder',
  templateUrl: './horse-finder.component.html',
  styleUrls: ['./horse-finder.component.css']
})
export class HorseFinderComponent implements OnInit, OnDestroy {
    private alive = true;
    accordionItem: string;
    catFilter: any[];
    errorText: boolean;
    expand: boolean;
    filterData: any;
    getRaceCourse: any[];
    horseLength = 0;
    horseData: any;
    itemShow: any;
    itemsPerClick: any;
    isSliderData = false;
    raceCourseData: any;
    raceCourses: any[];
    racesCourse: any[];
    selectedFilters: any[];
    selectedVal: any[];
    selectionId = [];
    subArrayOfHorses: any[];
    slideValue: any = 0;
    showBetslip: boolean;
    sliderValues = [];
    selectedRaceCourses = ',';

    /**
    * @constructor
    * @param {HorseFinderData} horseFinderData - instance of HorseFinderData service.
    * @param {KambiService} kambiService - instance of KambiService to access kambi methods.
    * @param {Staticwordsdata} staticWordsData - instance of Staticwordsdata to access translation words.
    * @param {AnalyticsService} analytics - instance of AnalyticsService to send analytics.
    */
    constructor(private horseFinderData: HorseFinderService,
        private kambiService: KambiService,
        public staticWordsData: StaticWordsService,
        private analytics: AnalyticsService,
        private elementRef: ElementRef) { }
    /**
    * This method is used to show odds on odds slider.
    * @param {any} event - jQuery object.
    */
    showOdds(event) {
        const oddsText = this.elementRef.nativeElement.querySelector('.mat-slider-thumb-label-text');
        if (this.kambiService.oddsFormat === 'fractional') {
            oddsText.innerHTML = this.sliderValues[event.value]['Fractional'];
        } else if (this.kambiService.oddsFormat === 'american') {
            oddsText.innerHTML = this.sliderValues[event.value]['American'];
        } else {
            oddsText.innerHTML = this.sliderValues[event.value]['Decimal'];
        }
    }
    /**
    * This method is used to get data based on selected filters.
    * @param {any} value - this variable contain selected race courses list.
    * @param {any} filter - this variable defines from where this method is called.
    * if filter = 'racecourse' means this method is called from race course select drop down.
    * if filter = 'odds' means this method is called when odds slider is changed.
    */
    showHorses(value, filter) {
        let races;
        let selectedRaceCoursesGa;
        if (filter === 'odds') {
            this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder,
                'HorseFinder.OddsBarClick',
                this.sliderValues[this.slideValue]['Decimal']);
        }
        if (value === undefined || value.length === 0) {
            races = ',';
            this.selectedRaceCourses = ',';
        } else if (value.length > 0) {
            races = value;
            this.selectedRaceCourses = value;
            selectedRaceCoursesGa = value.join(',');
        } else {
            races = this.racesCourse.join(',');
            this.selectedRaceCourses = this.racesCourse.join(',');
        }
        if (filter === 'racecourse') {
            this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.Courses', selectedRaceCoursesGa);
        }
        this.updateHorses();
    }
    /**
    * Method to show horses when click on showbets button.
    * @param {any} value - this variable contain selected race courses list.
    */
    showBets(value) {
        this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.ShowBets', '');
        if (this.horseData.length > 0) {
            this.errorText = false;
            this.showBetslip = true;
        } else {
            this.errorText = true;
        }
        this.rowFormation(this.horseData);

    }
    /**
    * Method to show and Hide RTB.
    * @param {any} item - this variable contain identifier of the accordion to show and hide RTB.
    */
    showHideRTB(item) {
        if (item === this.accordionItem) {
            this.accordionItem = '';
        } else {
            this.accordionItem = item;
        }
    }
    /**
    * Method to reset all filters.
    */
    resetFilters() {
        this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.Reset', '');
        this.selectedFilters = [];
        for (const data of this.filterData) {
            data.selected = false;
        }
        this.slideValue = 0;
        this.raceCourses = [];
        this.racesCourse = [];
        this.selectedVal = [];
        this.subArrayOfHorses = [];
        this.getHorsesFromService();
        this.errorText = false;
        this.showBetslip = false;
    }
    /**
    * Method gets horses data from service.
    */
    getHorsesFromService() {
        this.horseFinderData.getHorseData(',', this.slideValue, ',').subscribe(resData => {
            this.horseData = resData.TimeformHorses;
            this.horseLength = resData.TimeformHorses.length;
        });
    }
    /**
    * This method is called initially and gets data.
    */
    ngOnInit() {
        this.getHorsesFromService();
        this.horseFinderData.getRaceCourseData()
            .subscribe(resData => {
                this.raceCourseData = resData;
                const raceCourses = [];
                const racesCourse = [];
                const getRaceCourse = [];
                for (const course of this.raceCourseData) {
                    getRaceCourse.push(course);
                    raceCourses.push(course.Name);
                    racesCourse.push(course.Name);
                }
                this.raceCourses = raceCourses;
                this.racesCourse = raceCourses;
                this.getRaceCourse = getRaceCourse;
            });
        this.horseFinderData.getFilterData()
            .subscribe(resData => {
                this.filterData = resData;
                for (const data of this.filterData) {
                    data.selected = false;
                }
                const itemShow = 8;
                const itemsPerClick = 8;
                const catfilter = [];
                catfilter.push(this.filterData.slice(0, itemShow));
                this.catFilter = catfilter;
                this.selectedFilters = [];
                this.itemShow = itemShow;
                this.itemsPerClick = itemsPerClick;
            });
        this.horseFinderData.getSliderData()
            .subscribe(resData => {
                this.sliderValues = resData;
                this.isSliderData = true;
            });
        IntervalObservable.create(environment.refreshPre)
            .takeWhile(() => this.alive) // only fires when component is alive
            .subscribe(() => {
                this.updateHorses();
            });
    }
    /**
    * This method is called when a filter is selected or de-selected.
    * @param {any} ind - this variable contain index of the filter.
    * @param {any} id - this variable contain filter id.
    * @param {any} cname - this variable contain filter name.
    */
    selectFilter(ind, id, cname) {
        this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.Filters', cname);
        this.filterData[ind]['selected'] = !this.filterData[ind]['selected'];
        if (this.filterData[ind]['selected'] === true) {
            this.selectedFilters.push(id);
        } else {
            this.selectedFilters.splice(this.selectedFilters.indexOf(id), 1);
        }
        this.showHorses(this.selectedVal, '');

    }
    /**
    * this method is used to show more and less filters
    */
    showMore() {
        let itemShow;
        if (this.itemShow < this.filterData.length) {
            this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.MoreFilters', '');
            itemShow = this.itemShow + this.itemsPerClick;
            this.expand = true;
        } else {
            this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.LessFilters', '');
            itemShow = this.itemShow - this.itemsPerClick;
            this.expand = false;
        }
        const catFilter = [];
        const result = this.filterData;
        catFilter.push(result.slice(0, itemShow));
        this.catFilter = catFilter;
        this.itemShow = itemShow;
    }

    /**
    * Method to form rows in display.
    * @param {any} data - this variable contain all horses.
    */
    rowFormation(data) {
        const mainArraylength = data.length;
        const itemShow = 2;
        const totPages = Math.ceil(mainArraylength / itemShow);
        const subArrayOfHorses = [];
        for (let i = 0; i < totPages; i++) {
            subArrayOfHorses.push(data.slice(i * itemShow, (i + 1) * itemShow));
        }
        this.subArrayOfHorses = subArrayOfHorses;
        if (this.subArrayOfHorses.length === 0) {
            this.errorText = true;
        }
    }
    /**
    * this method is used to add a bet to betslip.
    * @param {any} outcome - this variable contain outcome id.
    */
    addToBetslip(outcome) {
        this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.OddsClick', outcome);
        this.kambiService.addToBetslip([outcome], 'single');
    }
    /**
    * this method is used to add all bets to betslip.
    */
    addAllToBetslip() {
        const selectionIds = [];
        let selectedIds = '';
        for (const data of this.horseData) {
            selectionIds.push(data.SelectionId);
        }
        this.selectionId = selectionIds;
        selectedIds = selectionIds.join(',');
        this.kambiService.addToBetslip(this.selectionId, 'multi');
        this.analytics.sendAnalytics(environment.widgetsCategories.horseFinder, 'HorseFinder.AddAllToBetSlip', selectedIds);
    }
    /**
    * this method is used to get Horses based on selection
    */
    updateHorses() {
        let selectedOptions;
        if (this.selectedFilters.length === 0) {
            selectedOptions = ',';
        } else {
            selectedOptions = this.selectedFilters.join(',');
        }
        this.horseFinderData.getHorseData
            (selectedOptions, this.sliderValues[this.slideValue]['Decimal'], this.selectedRaceCourses).subscribe(resdata => {
                this.horseData = resdata.TimeformHorses;
                if (this.horseData.length > 0) {
                    this.errorText = false;
                    this.showBetslip = false;
                } else {
                    this.errorText = true;
                    this.subArrayOfHorses = [];
                }
                this.horseLength = this.horseData.length;
            });
    }
    /**
    *
    * This function called before destroying  the component.
    */
    ngOnDestroy() {
        this.alive = false;
    }

}
