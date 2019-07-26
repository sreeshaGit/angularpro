/**
 *  A class representing a DialogComponent and its functionality.
 */
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
      trigger('dialog', [
          transition('void => *', animate('150ms ease-in', keyframes([
              style({ transform: 'translate3d(0, 100%, 0)' }),
              style({ transform: 'translate3d(0, 0, 0)' })
          ]))),
          transition('* => void', animate('150ms ease-in-out', keyframes([
              style({ transform: 'translate3d(0, 0, 0)', visibility: 'visible' }),
              style({ transform: 'translate3d(0, 100%, 0)' })
          ])))
      ])
  ]
})
export class DialogComponent implements OnInit {
    @Input() closable = true;
    @Input() visible: boolean;
    @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }
  /**
   * This function used to close the popup when triggered.
   */
  close() {
      this.visible = false;
      this.visibleChange.emit(this.visible);
  }
}
