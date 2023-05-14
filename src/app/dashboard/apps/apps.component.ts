import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-apps',
  templateUrl: './apps.component.html',
  styleUrls: ['./apps.component.less']
})
export class AppsComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource<App>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface App {
  name: string;
}

const ELEMENT_DATA: App[] = [
  {name: 'App 1'},
  {name: 'App 2'},
  {name: 'App 3'},
  {name: 'App 4'},
  {name: 'App 5'},
  {name: 'App 6'},
  {name: 'App 7'},
  {name: 'App 8'},
  {name: 'App 9'},
  {name: 'App 10'},
];
