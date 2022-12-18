import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuickStartComponent } from './quick-start/quick-start.component';
import { ActiveWorkComponent } from './active-work/active-work.component';

@NgModule({
  declarations: [
    QuickStartComponent,
    ActiveWorkComponent
  ],
  imports: [
    CommonModule
  ]
})
export class DashboardModule { }
