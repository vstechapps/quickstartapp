import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.less']
})
export class FaqComponent implements OnInit {

  
  @ViewChild(MatAccordion) accordion!: MatAccordion;

  constructor() {
   }

  ngOnInit(): void {
    console.log("Hello klkkl");
    console.log(this.accordion);
    this.accordion?.openAll();
  }

}

export const questions=[
  { q:"What is Transfer Pricing?" , a:"Transfer pricing is an accounting practice that represents the price that one division in a company charges another division for goods and services provided"},
  { q:"Does your company need Transfer Pricing?" , a:"Transfer pricing is an accounting practice that represents the price that one division in a company charges another division for goods and services provided"},
  { q:"Who will perform Benchmarking analysis?" , a:"Transfer pricing is an accounting practice that represents the price that one division in a company charges another division for goods and services provided"}
];
