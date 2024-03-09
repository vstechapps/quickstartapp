import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppService } from '../app.service';
import { FirestoreService } from '../firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit{

  @Output()
  close:EventEmitter<boolean> = new EventEmitter();

  @Output()
  action:EventEmitter<string> = new EventEmitter();

  constructor(public app: AppService,public firestore:FirestoreService, public router: Router){

  }

  
  ngOnInit(): void {
  }

  login(){
    this.router.navigate(["login"]);
  }

  logout(){
    this.router.navigate(["logout"]);
  }

  
}
