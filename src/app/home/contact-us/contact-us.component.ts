import { Component, OnInit } from '@angular/core';
import { ICON_REGISTRY_PROVIDER_FACTORY } from '@angular/material/icon';
import { FirestoreService } from '../../services/firestore.service';
import { Validation } from '../../shared/models';
import { Validations } from '../../shared/validations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.less']
})
export class ContactUsComponent implements OnInit {

  firstname:string="";
  lastname:string="";
  email:string="";
  contact:string="";
  comment:string="";

  validations:Validation[]=Validations.filter(i=>["firstname","lastname","email","comment"].includes(i.ctrl));
  touched:boolean=false;
  validated:boolean=false;
  errors:any={};

  constructor(public firestore:FirestoreService) { }

  ngOnInit(): void {
  }

  
  validate(){
    let errs:any={};
    let validated=true;
    if(!this.touched)return;
    this.validations.forEach(v=>{
      for(var c in v.chcks){
        if(eval(v.chcks[c].chck)){
          validated=false;
          errs[v.ctrl]=v.chcks[c].msg;
          break;
        }
      }
    });
    this.validated=validated;
    this.errors=errs;
    return validated;
  }


  submitMessage(){
    this.touched=true;
    if(!this.validate())return;
    this.firestore.loader.show();
    this.firestore.firestore.collection("posts").add(this.getMessageDetail())
    .then(success=>{
      this.firestore.loader.hide();
      this.firestore.toast.success("Our Team will get in touch with you shortly","Thanks for reaching out.");
      this.reset();
    })
    .catch(fail=>{
      this.firestore.loader.hide();
      this.firestore.toast.error("Unable to send your request. Please Try Again","Error")
      this.reset();
    });
  }

  reset(){
    this.firstname="";
    this.lastname="";
    this.email="";
    this.contact="";
    this.comment="";
  }
  getMessageDetail(){
    return {firstname:this.firstname,lastname:this.lastname,email:this.email,message:this.comment,contact:this.contact}
  }

}
