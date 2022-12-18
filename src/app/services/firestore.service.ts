import { EventEmitter, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../basic/loader/loader.service';
import { User } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  public user?:User;
  private users?:AngularFirestoreCollection<User>;
  public UserUpdateEvent=new EventEmitter<User>();

  constructor(public firestore: AngularFirestore,public auth: AngularFireAuth,public toast:ToastrService, public loader:LoaderService) {
    this.users = this.firestore.collection("users");
    this.toast.toastrConfig.progressBar=true;
    this.toast.toastrConfig.positionClass="toast-bottom-right";
    this.toast.toastrConfig.timeOut=10000;
    this.onAuthStateChanged();
  }

  onAuthStateChanged(){
    this.auth.authState.subscribe((u:any)=>{
      this.loader.show();
      if(u==null){
        this.loader.hide();
        this.UserUpdateEvent.emit(undefined);
        return;
      }
      console.log("FirestoreService: Auth State Changed ",u);
      this.users?.doc(u.email).get().subscribe((a)=>{
        this.user=a.data();
        console.log("FirestoreService: User Updated ",this.user);
        this.loader.hide();
        this.UserUpdateEvent.emit(this.user);
      });
    });
  }

  register(user:User){
    if(!user.password)return;
      this.loader.show();
      this.auth.createUserWithEmailAndPassword(user.email,user.password)
      .then((value)=>{
        user.password="";
        this.firestore.collection("users").doc(user.email).set(user).then((success)=>{
          this.loader.hide();
          this.toast.success(user.email,"User Registration Success")
          this.user=user;
        },(err)=>{
          this.loader.hide();
          console.error("FirestoreService",err);
          this.toast.error("Unable to register User","Registration Error");
        });
      },(reason)=>{
        this.loader.hide();
        console.error("FirestoreService",reason);
        this.handleRegisterError(reason.code,user);
      });
  
    
  }

  handleRegisterError(code:string,user:User){
    switch(code){
      case "auth/email-already-in-use":
        this.toast.error(user.id+" is already registered in our system.","Registration Error")
        break;
      default:
        this.toast.error("Unable to register "+user.id+" "+code,"Registration Error");
        break;
    }
  }

  

  
}
