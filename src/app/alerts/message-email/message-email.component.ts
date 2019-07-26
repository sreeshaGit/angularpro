/**
 *  A class representing a MessageEmailComponent and its functionality.
 */
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-message-email',
  templateUrl: './message-email.component.html',
  styleUrls: ['./message-email.component.scss']
})
export class MessageEmailComponent implements OnInit {
 
  checkEmail = false;
  emailDetError = false;
  emailSub: any;
  message: any;
  page: any;

  smsMsg: any;
  emailmsg: any;
  landingPage: any;
  
  @Input() displayType: any;
  @Input() displayText: any;
  @Output() closeSuccess: EventEmitter<any> = new EventEmitter(false);
  @Output() dispalySuccess: EventEmitter<any> = new EventEmitter(false);
  @Output() isEmailChecked: EventEmitter<any> = new EventEmitter(false);
  constructor() { }

  ngOnInit() {
    
  }
  /**
   * This function used to close the popup.
   */
  popUpClose() {
      this.closeSuccess.emit(true);
  }
  /**
   * This function used to set header text.
   */
  setHeaderText() {
      if (this.displayType == "Send Email"){
          return 'Send Email';
      } else if (this.displayType == "Send SMS"){
          return 'Send SMS';
      } else if (this.displayType == "Send WhatsApp"){
          return 'Send WhatsApp';
      }
  }
  /**
   * This function used to show hide popup.
   * @param displayText
   */
  sendTo(displayText) {      
      this.emailDetError = false;
      if (displayText == "Send Email") {        
          if (!this.emailSub && this.emailSub != '' || !this.message && this.message != '') {
              this.emailDetError = true;
          } else {
                this.dispalySuccess.emit(true);     
          }
      } else {         
          if (!this.smsMsg && this.smsMsg != '' || !this.landingPage && this.landingPage != '' && !this.checkEmail) {
              this.emailDetError = true;
          } else if (this.checkEmail && !this.emailmsg && this.emailmsg != ''){
              this.emailDetError = true;
          } else {
                    this.dispalySuccess.emit(true);     
          }        
      }
   
  }
  /**
   * This function used to update checked options.
   * @param evt
   */
  updateCheckedOptions(evt) {    
      this.checkEmail = !this.checkEmail;
      this.isEmailChecked.emit(this.checkEmail);
  }
}
