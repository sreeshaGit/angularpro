import { Component, OnInit } from '@angular/core';
import {CommonService} from '../services/common.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sports = [];
  selectedSport = 'Soccer';
  constructor(private commonService:CommonService) { }

  ngOnInit() {  
    this.sports = [{"name":"Soccer"},
    {"name":"Tennis"},
    {"name":"Ice Hockey"}] 
    this.commonService.sport.subscribe(sport => {
      this.selectedSport = sport;     
    });
  }

  sportSelected(sport){
    this.selectedSport = sport;
    this.commonService.sport.next(sport);  
    this.commonService.betsData.next([]);  
  }
}
