import { Component } from '@angular/core';
import { Events, FirestoreService } from '../firestore.service';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Role, User } from '../app.models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  private provider = new GoogleAuthProvider();


  constructor(private router:Router, private fs: FirestoreService){
    var redirect:any = sessionStorage.getItem("redirect");
    sessionStorage.removeItem("redirect");

    fs.refreshUser.subscribe(user=>{
      if(user!=null){
        if(redirect){
          console.log('Login Success, Redirecting to ', redirect);
          this.router.navigateByUrl(redirect);
        }else{
          console.log('Login Success, Redirecting to home');
          this.router.navigate(["home"]);
        }
      }
    });
  }

  login(){
    // Show Loader
    this.fs.loader.show();
    signInWithPopup(this.fs.auth, this.provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      let user:any = result.user;
      
      console.log("LoginComponent: SignInUser",user);
      let u: User = {id:user.uid,email:user.email,name:user.displayName,contact:user.phoneNumber,image:user.photoURL,role:Role.USER}
      this.fs.log(Events.LOGIN,u);
      // Post Login Functionality will be taken care by FirestoreService
      

    }).catch((error) => {
      // Hide Loader
      this.fs.loader.hide();
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
  });
    
 }

}