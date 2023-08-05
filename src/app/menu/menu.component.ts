import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent {

  @Output()
  close = new EventEmitter();

  active:string="";

  ignoreNextScrollEvent = false;

  constructor(public router:Router){
    document.addEventListener("scroll",(event)=>this.checkView(event),false);

    this.checkView(null);

  }

  checkView(event:any){
    if(this.ignoreNextScrollEvent){
      this.ignoreNextScrollEvent=false;
      return;
    }
    var views=["app-profile","app-skills","app-experience","app-awards","app-projects","app-library1","app-store"];
    for(var i in views){
      var v=views[i];
      var el = document.getElementsByTagName(v)[0];
      if(el && this.checkVisible(el)){
        this.active=v;
      }
    }
  }

  checkVisible(elm:Element) {
    var rect = elm.getBoundingClientRect();
    var top = rect.top;
    var viewHeight = window.innerHeight /2;
    return top < viewHeight;
  }

  focus(view:string){
    let el:Element = document.getElementsByTagName(view)[0];
    if(el){
      var rect= el.getBoundingClientRect();
      var top = rect.top;
      var pageTop = window.visualViewport?.pageTop
      if(pageTop){
        top+=pageTop;
      }
      
      window.scrollTo(rect.left,top-80);
      
      this.active=view;
      setTimeout(()=>this.close.emit(),100);
    }
  }

}
