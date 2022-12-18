import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentTypes } from 'src/app/shared/models';

@Component({
  selector: 'app-quick-start',
  templateUrl: './quick-start.component.html',
  styleUrls: ['./quick-start.component.less']
})
export class QuickStartComponent implements OnInit {

  constructor(private router: Router) { }

  years:string[]=[];
  types:any[]=DocumentTypes;
  year:string="";
  type:string="";
  ngOnInit(): void {
    let cy:number = new Date().getFullYear();
    for(var i=0;i<3;i++){
      this.years.push(""+(cy-i)+"-"+(""+(cy-i+1)).substring(2));  
    }
    this.year=this.years[0];
    this.type=this.types[0].code;
  }

  createRequest(){
    this.router.navigateByUrl("/work/request?type="+this.type+"&year="+this.year);
  }

}
