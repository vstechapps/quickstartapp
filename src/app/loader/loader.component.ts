import { Component } from '@angular/core';
import { LoaderService } from './loader.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent {
  isLoading: BehaviorSubject<boolean> = this.loaderService.isLoading;
  constructor(private loaderService: LoaderService){}

}