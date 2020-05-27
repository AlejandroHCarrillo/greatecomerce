import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { DataTableModule } from 'angular-4-data-table';
import { TableModule } from 'primeng/table';
// import { DropdownModule } from 'primeng/primeng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { environment } from '../environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { NavbarComponent } from './components/common/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/guards/auth.guard';
import { UserService } from './services/user.service';
import { AdminAuthGuard } from './services/guards/admin-auth.guard';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { CustomMinDirective } from './directives/custom-min-validator.directive';
import { CustomMaxDirective } from './directives/custom-max-validator.directive';
import { ProductFilterComponent } from './components/products/product-filter.component';
import { ProductCardComponent } from './components/products/product-card.component';
import { ShoppingCartService } from './services/shopping-cart.service';
import { ProductQuantityComponent } from './components/products/product-quantity.component';
import { OrderService } from './services/order.service';
import { ShoppingCartSummaryComponent } from './components/checkout/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/checkout/shipping-form.component';

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
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    CustomMinDirective,
    CustomMaxDirective,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
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
  providers: [
    AuthService,
    AuthGuard, 
    AdminAuthGuard,
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService, 
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
