import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.less']
})
export class TabsComponent {

  @Input("tabs")
  tabs:string[] =[];

  @Input("tab")
  tab:string = "";

  @Output("tabChange")
  tabChange:EventEmitter<string> = new EventEmitter();

  next(){
    if(this.tab=="")return;
    let i = this.tabs.indexOf(this.tab);
    if(i==-1 || i==this.tabs.length-1)return;
    this.tab=this.tabs[i+1];
    this.tabChange.emit(this.tab);
  }
  
  previous(){
    if(this.tab=="")return;
    let i = this.tabs.indexOf(this.tab);
    if(i==-1 || i==0)return;
    this.tab=this.tabs[i-1];
    this.tabChange.emit(this.tab);
  }

}
