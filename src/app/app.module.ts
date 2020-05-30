import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminModule } from 'admin/admin.module';
// import { SharedModule } from 'primeng/api/shared';
import { TableModule } from 'primeng/table';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ShippingFormComponent } from './components/checkout/shipping-form.component';
import { ShoppingCartSummaryComponent } from './components/checkout/shopping-cart-summary.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { UserComponent } from './components/user/user.component';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { SharedModule } from 'shared/shared.module';

// import { DataTableModule } from 'angular-4-data-table';
// import { DropdownModule } from 'primeng/primeng';

// import { AdminAuthGuard } from 'shared/services/guards/admin-auth.guard';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    CustomMinDirective,
    CustomMaxDirective,
    ProductFilterComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AdminModule,
    
    AppRoutingModule,
    FormsModule,
    // DataTableModule,
    TableModule,
    // DropdownModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,


    NgbModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
