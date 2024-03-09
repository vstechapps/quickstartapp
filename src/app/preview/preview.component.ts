import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { isEmptyElement, Node, NodeUtil } from '../app.models';
import { AppService } from '../app.service';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Collections, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.less']
})
export class PreviewComponent implements OnInit, OnChanges {

  @Input()
  design?: Node;

  html: string = "";

  constructor(public appService:AppService,public firestore:FirestoreService){
    this.appService.events.subscribe((key:string)=>{
      if(key=="preview") this.ngOnChanges();
      if(key=="download") this.download();
      if(key=="save") this.save();
    });
  }

  ngOnInit() {
    console.log("Rendering Preview ...")
    this.html = this.process(this.design);
    this.update();
  }

  ngOnChanges(){
    console.log("Rendering Preview ...")
    this.html = this.process(this.design);
    this.update();
  }

  download(){
    //navigator.clipboard.writeText(this.html.replaceAll("\"","\\\""));
    navigator.clipboard.writeText(this.html);
  }

  

  update(){
    let e = document.getElementById("preview");
    if(e){
      e.innerHTML= this.html;
    }
  }

  async save(){
    if(this.design){
      await setDoc(doc(collection(this.firestore.firestore,Collections.DESIGNS), this.appService.file),{design:this.html});
      alert("Design Saved");
    }
  }

  

  process(node?: Node): string {
    console.log("Processing ",node);
    let text: string = "";
    if (node) {
      let isEmpty: boolean = isEmptyElement(node.tag);
      let attributeText = "";
      for (let a of node.attributes) {
        attributeText += " " + a[0] + "=\"" + a[1] + "\"";
      }
      if (isEmpty) {
        text = "<" + node.tag + attributeText + "/>";
      } else {
        let childText = "";
        if(node.text){
          childText += node.text;
        }
        for (let c of node.children) {
          childText += this.process(c);
        }
        text = "<" + node.tag + attributeText + ">" + childText + "</" + node.tag + ">";
      }
    }
    return text;
  }

}
