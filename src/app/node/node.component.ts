import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Node } from '../app.models';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.less']
})
export class NodeComponent {

  @Input()
  node?:Node;

  @Input()
  current?:Node;

  @Output()
  select:EventEmitter<Node> = new EventEmitter();

  expand=false;

}
