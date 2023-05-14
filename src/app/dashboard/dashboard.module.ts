import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppsComponent } from './apps/apps.component';
import { MaterialModule } from '../shared/material.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppsComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatTableModule
  ],
  exports:[
    AppsComponent
  ]
})
export class DashboardModule { }
