import { EventEmitter, Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { Analytics, getAnalytics, logEvent } from "firebase/analytics";

import { Auth, getAuth } from "firebase/auth";

import { Firestore, collection, doc, getDoc, getDocs, setDoc, getFirestore, query, orderBy, limit} from "firebase/firestore";
import { Role, User } from './app.models';
import { LoaderService } from './loader/loader.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  
  app: FirebaseApp= initializeApp(firebaseConfig);
  analytics: Analytics = getAnalytics(this.app);
  firestore: Firestore = getFirestore(this.app);
  auth: Auth = getAuth(this.app);
  
  user?:User;
  isAdmin:boolean=false;

  data:any = {};
  cursors:any = {};

  refreshEvent:EventEmitter<Collections> = new EventEmitter<Collections>();
  refreshUser:EventEmitter<User> = new EventEmitter<User>();

  

  constructor(public loader:LoaderService) {
    this.refreshUserSession();
    var collections = [Collections.DESIGNS];
    for(var i in collections){
      this.init(collections[i])
      this.refresh(collections[i]);
    } 
  }

  init(key:Collections){
    this.cursors[key]={order:"order",limit:20};
  }

  refreshUserSession(){
    this.auth.onAuthStateChanged((authState:any)=>{
      if(authState==null){
        this.user=undefined;
        this.isAdmin = false;
        this.refreshUser.emit(undefined);
      }else{
        console.log("FirestoreService:refreshUserSession:: Auth State Changed ",authState);
        // Show Loader
        this.loader.show();
        let user:any= authState;
        // User has properties uid, email, displayName, phoneNumber, photoURL
        let u: User = {id:user.uid,email:user.email,name:user.displayName,contact:user.phoneNumber,image:user.photoURL,role:Role.USER}
        this.login(u);
      }
      
    })
  }

  refresh(key:Collections){
    console.log("Refreshing "+key);
    let collect =  collection(this.firestore, key);
    const q = query(collect, limit(this.cursors[key].limit));
    getDocs(q).then(res=>{
    this.data[key] =[];
    res.forEach(doc=>
      {
        let d:any = doc.data();
        d.id=doc.id;
        this.data[key].push(d);
      });
      this.refreshEvent.emit(key);
    });
  }

  async login(user:User){
    const docRef = doc(this.firestore, "users", user.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // User already present in firestore
      let d:any = docSnap.data();
      console.log("FirestoreService:login:: Existing User :", d);
      this.user = {id:d.id,name:d.name,email:d.email,contact:d.contact,role:d.role,image:d.image};
      this.refreshUser.emit(this.user);
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.isAdmin = this.user.role==Role.ADMIN;
      // Hide Loader
      this.loader.hide();
    } else {
      // Create new user in firestore
      console.log("FirestoreService:login:: Create new user: "+user.email);
      this.user = user;
      await setDoc(doc(collection(this.firestore,"users"), user.id),this.user);
      console.log("FirestoreService:login:: Created new user: "+user.email);
      this.refreshUser.emit(this.user);
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.log(Events.SIGN_UP,this.user);
      // Hide Loader
      this.loader.hide();
    }

  }

  async logout(){
    console.log("FirestoreService:logout:: Logging out user: "+this.user?.email);
    this.user=undefined;
    sessionStorage.clear();
    this.isAdmin=false;
    this.log(Events.LOGOUT,this.user);
    this.refreshUser.emit(this.user);
  }

  log(event:string,data:any=null){
    let message:any={
      url:window.location.href,
      device:window.navigator.userAgent,
      timestamp:new Date().toISOString(),
      event:event
    }
    if(data){
      message.data=data;
    }
    console.log("Sending Event to Analytics: ",message);
    logEvent(this.analytics, event, message);
  }

  
}


export enum Events{
  PAGE_VIEW="PAGE_VIEW",
  LOGIN="login",
  SIGN_UP="sign_up",
  LOGOUT="logout"

}

export enum Collections{
  DESIGNS="designs"
}

const firebaseConfig = {
    apiKey: "AIzaSyAW1LTd9_9KMW90Xtcwd_wzAv6oSyYxdUs",
    authDomain: "design-vvsk.firebaseapp.com",
    projectId: "design-vvsk",
    storageBucket: "design-vvsk.appspot.com",
    messagingSenderId: "145324731810",
    appId: "1:145324731810:web:52249d2b70fbee852896fb",
    measurementId: "G-RYQ3M3HT1H"
};