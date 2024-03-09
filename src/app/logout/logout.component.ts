import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { signOut } from "firebase/auth";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.less']
})
export class LogoutComponent {

  constructor(private router:Router, private fs: FirestoreService){
    fs.refreshUser.subscribe(user=>this.router.navigate(user?["dashboard"]:["home"]));
  }

  logout(){
    signOut(this.fs.auth).then(()=>this.fs.logout());
    
  }

}