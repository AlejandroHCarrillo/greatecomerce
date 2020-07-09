import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';

import { AdminModule } from 'admin/admin.module';
import { CoreModule } from 'core/core.module';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { ReportsModule } from './reports/reports.module';
import { NgDragDropFilesDirective } from './directives/ng-drag-drop-files.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CustomMinDirective,
    CustomMaxDirective,
    NgDragDropFilesDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,

    SharedModule,
    CoreModule,
    AdminModule,
    ShoppingModule,
    ReportsModule,
    
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),

    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }