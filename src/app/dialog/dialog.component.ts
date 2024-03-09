import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Action, Form } from '../app.models';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.less']
})
export class DialogComponent {

  @Input()
  dialog?:Dialog;

  @Output()
  action:EventEmitter<string> = new EventEmitter<string>();

}

export interface Dialog{
  form?:Form;
  action?:string;
  title?:string;
  actions?:Action[];
}
