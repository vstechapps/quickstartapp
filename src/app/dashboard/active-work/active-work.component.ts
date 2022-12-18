import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-active-work',
  templateUrl: './active-work.component.html',
  styleUrls: ['./active-work.component.less']
})
export class ActiveWorkComponent implements OnInit {

  data:any[]=[];
  constructor() { }

  ngOnInit(): void {
    let data = [];
    data.push({name:"Transfer_Pricing_2019_20",type:"TRANSFERPRICING",created:new Date().toDateString()});
    data.push({name:"Transfer_Pricing_2020_21",type:"TRANSFERPRICING",created:new Date().toDateString()});
    data.push({name:"Transfer_Pricing_2021_22",type:"TRANSFERPRICING",created:new Date().toDateString()});
    //this.data = data;
  }

}
