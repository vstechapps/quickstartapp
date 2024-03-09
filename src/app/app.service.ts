import { EventEmitter, Injectable } from '@angular/core';
import { Node, NodeUtil } from './app.models';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    events: EventEmitter<string> = new EventEmitter<string>();

    current?:Node;

    design?:Node;

    paste?:Node;

    file?:string;

    parser = new DOMParser();

    constructor() {

    }



    parseText(html: string) {
        let design = undefined;
        console.log("Parsing: ", html);
        try {
            var doc = this.parser.parseFromString(html, 'text/html');
            design = this.parse(doc.body.children[0]);
        } catch (err) {
            console.error(err);
            alert("Unable to parse pasted content");
        }
        console.log("Parsing Success: ",design);
        return design;
    }

    parse(element: Element): Node {
        let n = NodeUtil.create(element.tagName);
        for(var i=0; i<element.attributes.length;i++){
          var attrib = element.attributes[i];
          n.attributes.set(attrib.name,attrib.value);
        }
        for(var i=0;i<element.children.length;i++){
          n.children.push(this.parse(element.children[i]));
        }
        for(var i=0;i<element.childNodes.length;i++){
            if(element.childNodes[i].nodeType==Node.TEXT_NODE){
                n.text = element.childNodes[i].textContent || undefined;
                break;
            }
        }
        return n;
    }

   


}