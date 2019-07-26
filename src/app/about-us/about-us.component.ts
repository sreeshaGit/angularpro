import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

    constructor(public appCom: AppComponent) {
        this.appCom.headerQueryString.next("AboutUs"); 
    }

  ngOnInit() {
  }

}
