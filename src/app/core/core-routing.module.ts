import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from 'core/components/home/home.component';
import { LoginComponent } from 'core/components/login/login.component';
import { RegisterComponent } from 'core/components/register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'home/:carrouselcontrols', component: HomeComponent},
  { path: 'home/slider', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
