import { Component, HostListener, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../shared/models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  user?:User;
  menu:Menu[]=[];
  contentScreenHeight=800;
  
  constructor(public firestore: FirestoreService, public router: Router) {
    this.contentScreenHeight = (window.innerHeight - 110) ;

  }

  ngOnInit(): void {
    this.loadMenu();
    this.firestore.UserUpdateEvent.subscribe(u=>{
      this.user=u;
      this.loadMenu();
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.contentScreenHeight = (window.innerHeight - 110);
  }

  loadMenu(){
    let m:Menu[]=[];
    
    if(this.user == undefined){
      m.push({name:'Register',link:'/register/consultant',class:'active-link',align:"top"});
      m.push({name:'Login',link:'/login',class:'active-link',align:"top"});
      m.push({name:'Home',link:'/home',class:'active-link',align:"bottom"});
      m.push({name:'About Us',link:'/about-us',class:'active-link',align:"bottom"});
      m.push({name:'Services',link:'/our-services',class:'active-link',align:"bottom"});
      m.push({name:'Workflow',link:'/workflow',class:'active-link',align:"bottom"});
      m.push({name:'Contact',link:'/contact-us',class:'active-link',align:"bottom"});
      m.push({name:'FAQ',link:'/faq',class:'active-link',align:"bottom"});
    }else{
      m.push({name:this.user.email,link:'/dashboard',class:'active',align:"top"});
      m.push({name:'Dashboard',link:'/dashboard',class:'active-link',align:"bottom"});
      m.push({name:'My Profile',link:'/profile',class:'active-link',align:"bottom"});
      m.push({name:'My Orders',link:'/orders',class:'active-link',align:"bottom"});
      m.push({name:'Logout',link:'/login',class:'active-link',align:"bottom"});
    }
    this.menu=m;

  }

  
}
export interface Menu{
  name?:string;
  icon?:string;
  link?:string;
  class?:string;
  click?:string;
  align?:string;

}
