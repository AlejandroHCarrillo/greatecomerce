import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from 'admin/admin.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    
    LoginComponent,
    RegisterComponent,
    UserComponent,

    HomeComponent,

    CustomMinDirective,
    CustomMaxDirective,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    ShoppingModule,
    
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),

    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
