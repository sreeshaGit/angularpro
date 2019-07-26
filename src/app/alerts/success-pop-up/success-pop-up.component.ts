/**
 *  A class representing a SuccessPopUpComponent and its functionality.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-success-pop-up',
  templateUrl: './success-pop-up.component.html',
  styleUrls: ['./success-pop-up.component.scss']
})
export class SuccessPopUpComponent implements OnInit {
  @Input() fromPage: any;
  @Input() displayText: any;
  @Output() closeSuccess: EventEmitter<any> = new EventEmitter(false);
  constructor() { }

  ngOnInit() {
     
  }

  /**
   * This function used to close the popup.
   */
  popUpClose() {
      this.closeSuccess.emit(true);
  }
}
