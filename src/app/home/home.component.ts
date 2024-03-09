import { Component } from '@angular/core';
import { Node, NodeUtil, STYLES } from '../app.models';
import { AppService } from '../app.service';
import { Dialog } from '../dialog/dialog.component';
import { Collections, FirestoreService } from '../firestore.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  menu:boolean=true;
  design?:Node;
  current?:Node;
  dialog?:Dialog;

  constructor(public app:AppService,public firestore:FirestoreService){

  }

  select(node:Node){
    console.log(node);
    this.current = node;
    this.app.current = node;
  }
  
  deselect(){
    this.current = undefined;
    this.app.current = undefined;
  }

  perform(action:string){
    if(DialogActions[action]!=null){
      this.dialog=DialogActions[action];
    }
    if(action=="close_dialog"){
      this.dialog=undefined;
    }
    if(action=="download"){
      this.app.events.emit("download");
    }
    if(action=="upload"){
      navigator.clipboard.readText().then(text=>{
        let d = this.app.parseText(text);
        if(d){
          this.design = d;
          this.app.design = d;
          this.current=this.design;
        }
      });
    }
    if(action=="delete"){
      this.dialog={form:{
        title:"Confirm Delete?",
        controls:[{id:"node-d",type:"textarea",value:JSON.stringify(this.current)}],
        actions:[{text:"Yes",action:"delete_confirm"}]}};
    }
    if(action=="delete_confirm"){
      this.perform("close_dialog");
      this.performDelete();
    }
    if(action.indexOf("add")==0){
      this.performAdd(action);
    }
    if(action.indexOf("edit")==0){
      this.performEdit(action);
    }
    if(action=="cut"){
      this.app.paste = this.current;
      this.performDelete();
    }
    if(action=="copy"){
      if(this.current)
      this.app.paste = NodeUtil.clone(this.current);
    }
    if(action=="paste"){
      if(this.current && this.app.paste){
        this.current.children.push(this.app.paste);
        this.app.events.emit("preview");
      }
    }
    if(action=="preview"){
      this.app.events.emit("preview");
    }
    if(action=="save"){
      this.dialog={form:{
        title:"Save Design",
        controls:[
          {id:"design-name",type:"text",placeholder:"Name",value:''}],
        actions:[{text:"Save",action:"save_"}]
      }};
      if(this.dialog.form && this.app.file){
        this.dialog.form.controls[0].value = this.app.file;
      }
    }
    if(action=="save_"){
      this.app.file = this.dialog?.form?.controls[0].value;
      if(this.app.file!=undefined && this.app.file!=""){
        this.app.events.emit("save");
      }
      this.perform("close_dialog");
    }
    if(action=="load"){
      this.dialog = {action:"load",title:"Load Design",actions:[]};
      let designs = this.firestore.data[Collections.DESIGNS];
      if(!designs)return;
      for(var d in designs){
        this.dialog.actions?.push({text:designs[d].id,action:"load_"+designs[d].id});
      }
    }
    else if(action.indexOf("load_")==0){
      let key = action.replace("load_","");
      let designs = this.firestore.data[Collections.DESIGNS];
      if(!designs){this.perform("close_dialog"); return;}
      let d = designs.filter((k:any)=>k.id==key)[0];
      if(!d){this.perform("close_dialog"); return;}
      let de = this.app.parseText(d.design);
      if(de){
        this.design = de;
        this.app.design = de;
        this.current=this.design;
        this.app.file=key;
      }
      this.perform("close_dialog");
    }
  }

  performEdit(action:string){
    if(action=="edit_text"){
      this.dialog=DialogActions['add_text'];
      if(this.dialog?.form){
        this.dialog.form.controls[0].value = this.current?.text || '';
      }
      if(this.dialog?.actions){
        this.dialog.actions[0].text="Update";
      }
    }
    if(action=="edit_style"){
      var cstyle = this.current?.attributes.get("style");
      cstyle = cstyle || '';
      if(cstyle==''){
        this.perform("add_style");
      }else{
        var cstyles = cstyle.split(";");
        this.dialog={form:{title:"Edit Style",controls:[],actions:[{text:"Update",action:"edit_style_"}]}}
        for(var i in cstyles){
          if(cstyles[i]=="" || cstyles[i]==" ")continue;
          var k = cstyles[i].split(":")[0];
          var v = cstyles[i].split(":")[1];
          this.dialog.form?.controls.push({id:'c_'+i,type:"text",label:k,value:v})
        }
      }
    }
    if(action=="edit_style_"){
      var s:string[] = [];
      this.dialog?.form?.controls.forEach(x=>{
        if(x.label!="" && x.value!="")s.push(x.label+":"+x.value);
      });
      if(s.length>0)this.current?.attributes.set("style",s.join(";")+";");
      this.perform("close_dialog");
    }
    if(action=="edit_attribute"){
      var cattr = this.current?.attributes;
      cattr = cattr || new Map<string,string>();
      if(cattr?.size==0){
        this.perform("add_attribute");
      }else{
        this.dialog={form:{title:"Edit Attr",controls:[],actions:[{text:"Update",action:"edit_attribute_"}]}}
        for(var i in cattr){
          if(i=="" || cattr.get(i)== null ||cattr.get(i)=="")continue;
          var v = cattr.get(i) || '';
          this.dialog.form?.controls.push({id:'c_'+i,type:"text",label:i,value:v})
        }
      }
    }
    if(action=="edit_attribute_"){
      let m = new Map<string,string>();
      this.dialog?.form?.controls.forEach(x=>{
        if(x.label && x.value && x.value!=""){
          m.set(x.label,x.value);
        }
      });
      if(this.current)this.current.attributes=m;
      this.perform("close_dialog");
    }
    if(action=="edit_class"){
      let k = this.current?.attributes.get("class") || "";
      this.dialog={form:{
        title:"Edit Class",
        controls:[{id:"addclass",type:"text",value:k}],
        actions:[{text:"Update",action:"edit_class_"}]
      }}
    }
    if(action=="edit_class_"){
      if(this.current){
        let k = this.dialog?.form?.controls[0].value;
        if(k==null || k==""){
          this.current.attributes.delete("class");
        }else{
          this.current.attributes.set("class",k);
        }
        this.perform("close_dialog");
      }
    }
    this.app.events.emit("preview");
  }


  performAdd(action:string){
    if(action.indexOf("add_element_")>-1){
      let t=action.replace("add_element_","");
      if(this.current==undefined){
        this.current=NodeUtil.create(t);
        this.design=this.current;
        this.app.design = this.design;
      }
      else{
        NodeUtil.add(this.current,t);
      }
      this.perform("close_dialog");
    }
    if(action.indexOf("add_text_")>-1){
      if(this.current){
        let v = this.dialog?.form?.controls[0].value;
        v = v==""? undefined : v;
        this.current.text= v;
      }
      console.log("Form",this.dialog?.form);
      this.perform("close_dialog");
    }
    if(action.indexOf("add_class_")>-1){
      if(this.current){
        let c = this.current.attributes.get("class");
        let k = this.dialog?.form?.controls[0].value;
        c = c?c+" "+k:k;
        if(c)this.current.attributes.set("class",c);
      }
      console.log("Form",this.dialog?.form);
      this.perform("close_dialog");
    }
    if(action.indexOf("add_style_")>-1){
      if(this.current){
        let c = this.current.attributes.get("style");
        let k = this.dialog?.form?.controls[0].value;
        let v = this.dialog?.form?.controls[1].value;
        c = c?c+k+":"+v+";":""+k+":"+v+";";
        if(c)this.current.attributes.set("style",c);
      }
      console.log("Form",this.dialog?.form);
      this.perform("close_dialog");
    }
    if(action.indexOf("add_attribute_")>-1){
      if(this.current){
        let k = this.dialog?.form?.controls[0].value;
        let v = this.dialog?.form?.controls[1].value;
        if(k && v)this.current.attributes.set(k,v);
      }
      console.log("Form",this.dialog?.form);
      this.perform("close_dialog");
    }
    this.app.events.emit("preview");
  }

  performDelete(){
    if(!this.design || !this.current) return;
      if(this.design.id==this.current.id){
        this.design=undefined;
        this.current=undefined;
        this.app.design=undefined;
        this.app.current=undefined;
      }else{
        NodeUtil.remove(this.design,this.current);
        this.current=this.design;
      }
      this.app.events.emit("preview");
  }
}

export const DialogActions:any={
  "add":{action:"add",title:"Add",actions:[
    {text:"Element",action:"add_element"},
    {text:"Text",action:"add_text"},
    {text:"Class",action:"add_class"},
    {text:"Style",action:"add_style"},
    {text:"Attribute",action:"add_attribute"},
  ]},
  "add_element":{action:"add_element",title:"Add Element",actions:[
    {text:"Div",action:"add_element_div"},
    {text:"Span",action:"add_element_span"},
    {text:"Button",action:"add_element_button"},
    {text:"Input",action:"add_element_input"},
    {text:"Paragraph",action:"add_element_p"},
    {text:"Image",action:"add_element_img"},
    {text:"Video",action:"add_element_video"},
    {text:"Script",action:"add_element_script"},
    {text:"Style",action:"add_element_style"}
  ]},
  "add_text":{form:{
    title:"Add Text",
    controls:[{id:"addtext",type:"textarea",placeholder:"Enter text here..",value:''}],
    actions:[{text:"Add",action:"add_text_"}]
  }},
  "add_class":{form:{
    title:"Add Class",
    controls:[{id:"addclass",type:"text",placeholder:"Specify class..",value:''}],
    actions:[{text:"Add",action:"add_class_"}]
  }},
  "add_style":{form:{
    title:"Add Style",
    controls:[
      {id:"addstylekey",type:"text",placeholder:"name",value:'',values:STYLES},
      {id:"addstylevalue",type:"text",placeholder:"value",value:''}],
    actions:[{text:"Add",action:"add_style_"}]
  }},
  "add_attribute":{form:{
    title:"Add Attribute",
    controls:[
      {id:"attributeKey",type:"text",placeholder:"name",value:''},
      {id:"attributeKey",type:"text",placeholder:"value",value:''}],
    actions:[{text:"Add",action:"add_attribute_"}]
  }},
  "edit":{action:"edit",title:"Edit",actions:[
    {text:"Text",action:"edit_text"},
    {text:"Class",action:"edit_class"},
    {text:"Style",action:"edit_style"},
    {text:"Attribute",action:"edit_attribute"},
  ]}
}