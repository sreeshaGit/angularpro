import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-data',
  templateUrl: './import-data.component.html',
  styleUrls: ['./import-data.component.scss']
})
export class ImportDataComponent implements OnInit {
    openError: boolean;
    isModalOpen: boolean;
    openSuccess: boolean;
    isModalOpen1: boolean;
  constructor() { }

  ngOnInit() {
  }
  /**
   * This function used to show pop-up.
   * @param event - boolean value.
   */
  modalPopupClosedCallback(event) {
      if (event === false) {
          this.isModalOpen = false;
      }
  }

  onError() {
      this.isModalOpen = true;
      this.openError = true;
  }
/**
 * This function used to show pop-up.
 * @param event - boolean value.
 */
  modalPopupClosedCallback1(event) {
      if (event === false) {
          this.isModalOpen1 = false;
      }
  }

  onSuccess() {
      this.isModalOpen1 = true;
      this.openSuccess = true;
  }

}
