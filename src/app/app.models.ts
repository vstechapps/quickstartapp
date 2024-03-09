
export interface Node{
    id:string,
    tag:TAG|string,
    attributes:Map<string,string>,
    children:Node[],
    text?:string
  }

  export class NodeUtil{
    static create=function(element:string):Node{
      return {id:NodeUtil.id(10),tag:element,attributes:new Map(),children:[]}
    }
    static add=function(node:Node,element:string):Node{
      let e:Node=NodeUtil.create(element);
      let o=node.children.push(e);
      return node.children[o-1];
    }
    static id=function(length:number):string {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
    }
    static remove=function(parent:Node,node:Node):boolean{
      var p = parent;
      var f = false
      for(var i=0;!f && i<p.children.length;i++){
        if(node.id==p.children[i].id){
          p.children.splice(i,1);
          return true;
        }else{
          f = NodeUtil.remove(p.children[i],node);
        }
      }
      return f;
    }
    static clone(node:Node):Node{
      let c: Node;
      if(node){
        c = NodeUtil.create(node.tag);
        c.attributes = node.attributes;
        c.text = node.text;
        for(var i in node.children){
          c.children.push(this.clone(node.children[i]));
        }
        return c;
      }
      return node;
    }
  }
  
  export enum TAG{
    DIV="div",SPAN="span",BUTTON="button",INPUT="input",IMG="img",P="p",SCRIPT="script"
  }

  export const STYLES=["height","width","margin","padding","border","text-align","float","position","display","color","background","font-size","font-weight","text-decoration","vertical-align"];

  export const emptyElems = ['area', 'base', 'br', 'col', 'command', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'meta', 'param', 'source', 'track', 'wbr'];

  export const isEmptyElement=function(e:string){
    return e!=null && emptyElems.indexOf(e.toLowerCase()) !== -1;
  }

  
export interface Form{
  name?:string;
  title:string;
  controls:Control[];
  actions:Action[];
}


export interface Control{
  id:string;
  name?:string;
  type:string;
  label?:string;
  placeholder?:string;
  text?:string;
  values?:string[];
  value:string;
}

export interface Action{
  text:string;
  action:string;
}

export interface User{
  id:string;
  name:string;
  email:string;
  image?:string;
  contact?:string;
  role:Role
}


export enum Role{
  USER="USER",
  ADMIN="ADMIN"
}