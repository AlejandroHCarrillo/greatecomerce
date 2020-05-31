import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from 'admin/admin.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { UserComponent } from './components/user/user.component';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { CoreModule } from 'core/core.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    
    UserComponent,

    CustomMinDirective,
    CustomMaxDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),

    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
