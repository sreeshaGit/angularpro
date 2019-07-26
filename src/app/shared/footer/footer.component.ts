/**
 * This component hold footer operation.
 */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    /**
     * 
     * @param router {Router} instance of Router
     */
    constructor(public router: Router) { }

  ngOnInit() {
  }
  /**
   * This function used to navigate to help page.
   */
  gotoHelp() {
      this.router.navigate(['help']); 
  }
  /**
   * This function used to navigate to about us page.
   */
  gotoAboutus() {
      this.router.navigate(['aboutus']);
  }
  /**
   * This function used to navigate to contact us page.
   */
  gotoContact() {
      this.router.navigate(['contact']);
  }
  
}
