import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent {
  preview:string="";
  html:any=undefined;
  element:any=undefined;
  inspect:any=undefined;
  tab="Design";


}


export enum Nodes{
  DIV="div",
  SPAN="span",
  IMG="img",
  SVG="svg",
  P="p"
}

export const Styles={
  PADDING:{style:"padding"},
  MARGIN:{style:"margin"}
}