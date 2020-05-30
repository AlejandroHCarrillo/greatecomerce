import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from 'admin/admin.module';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'shared/shared.module';
import { ShoppingModule } from 'shopping/shopping.module';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductFilterComponent } from './shopping/components/products/product-filter.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NavbarComponent,
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
    FormsModule,
    TableModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,


    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
