import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {

  constructor(public firestore:FirestoreService, public router:Router){

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.firestore.user==null){
      if(route.url.length>0){
        let s:string[] = [];
        route.url.forEach(u=>s.push(u.path));
        sessionStorage.setItem("redirect",s.join("/"));
      }
      this.router.navigateByUrl("login");
    }
    return true;
  }
  
}