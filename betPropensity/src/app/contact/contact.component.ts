/**
 *  A class representing a ContactComponent and its functionality.
 */
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

    constructor(public appCom: AppComponent) {
        this.appCom.headerQueryString.next("Contact"); 
    }

  ngOnInit() {
  }

}
