import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from 'core/components/home/home.component';
import { LoginComponent } from 'core/components/login/login.component';
import { RegisterComponent } from 'core/components/register/register.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreRoutingModule } from 'core/core-routing.module';
import { UserComponent } from 'core/components/user/user.component';

@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
  ],
  exports: [
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent

  ]
})
export class CoreModule { }
