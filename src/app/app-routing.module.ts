import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './user/profile/profile.component';
import { LoginComponent } from './user/login/login.component';
import { OurServicesComponent } from './home/our-services/our-services.component';
import { ContactUsComponent } from './home/contact-us/contact-us.component';
import { FaqComponent } from './home/faq/faq.component';
import { WorkflowComponent } from './home/workflow/workflow.component';
import { RegisterComponent } from './user/register/register.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { RequestComponent } from './work/request/request.component';
import { PaymentComponent } from './work/payment/payment.component';

const routes: Routes = [
  { path:'', pathMatch:"full", redirectTo: "home"},
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent},
  { path: 'our-services', component: OurServicesComponent},
  { path: 'contact-us', component: ContactUsComponent},
  { path: 'faq', component:FaqComponent},
  { path: 'workflow', component: WorkflowComponent},
  { path: 'register/:type', component: RegisterComponent},
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'work/request', component: RequestComponent},
  { path: 'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
