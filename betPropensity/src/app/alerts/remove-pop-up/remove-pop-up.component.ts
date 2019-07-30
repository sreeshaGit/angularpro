/**
 *  A class representing a RemovePopUpComponent and its functionality.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-remove-pop-up',
  templateUrl: './remove-pop-up.component.html',
  styleUrls: ['./remove-pop-up.component.scss']
})
export class RemovePopUpComponent implements OnInit {
 
  @Input() fromPage: any;
  @Input() reportName: any;
  @Output() closeDeletePopup: EventEmitter<any> = new EventEmitter(false);
  @Output() deleteOpt: EventEmitter<any> = new EventEmitter(false);

  constructor() { }

  ngOnInit() {}
  /**
   * This function used to delete the selected option.
   */
  proceedToDelete() {     
      this.deleteOpt.emit(true);
  }
  /**
   * This function used to close the popup.
   */
  popUpClose() {    
      this.closeDeletePopup.emit(true);
  }
}
