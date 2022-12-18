import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-section-cards',
  templateUrl: './section-cards.component.html',
  styleUrls: ['./section-cards.component.less']
})
export class SectionCardsComponent implements OnInit {

  cards:any[]=[];
  constructor() {
    this.cards.push({image:"assets/icons/company.png",head:"Are you company",content:"",action:"Get Started",route:"/register/company"});
    this.cards.push({image:"assets/icons/consultant.png",head:"Are you consultant",content:"",action:"Get Started",route:"/register/consultant"});
    this.cards.push({image:"assets/icons/support.png",head:"Talk to our Team",content:"",action:"Get Started",route:"/contact-us"});
   }

  ngOnInit(): void {
  }

}
