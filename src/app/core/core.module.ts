import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'core/components/home/home.component';
import { LoginComponent } from 'core/components/login/login.component';
import { RegisterComponent } from 'core/components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NgbModule

  ]
})
export class CoreModule { }
