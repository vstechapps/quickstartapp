import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { TabsComponent } from './tabs/tabs.component';
import { MenuComponent } from './menu/menu.component';
import { CodeComponent } from './code/code.component';
import { PreviewComponent } from './preview/preview.component';
import { NodeComponent } from './node/node.component';
import { DialogComponent } from './dialog/dialog.component';
import { FormComponent } from './form/form.component';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    TabsComponent,
    MenuComponent,
    CodeComponent,
    PreviewComponent,
    NodeComponent,
    DialogComponent,
    FormComponent,
    LoaderComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
