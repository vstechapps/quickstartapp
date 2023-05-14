import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FirestoreService } from '../services/firestore.service';
import { GoogleAuthProvider } from "firebase/auth";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AngularFireAuth, public firestore: FirestoreService) { }

  ngOnInit(): void {
  }


  login(){
    this.firestore.loader.show();
    this.auth.signInWithPopup(new GoogleAuthProvider()).then(()=>{
      this.firestore.loader.hide();
    }).catch(err=>{
      console.error(err);
      this.firestore.loader.hide();
    });

  }
}
