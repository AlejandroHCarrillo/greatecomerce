import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { AuthGuard } from './services/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminAuthGuard } from './services/guards/admin-auth.guard';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';


const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component:CheckoutComponent, canActivate: [ AuthGuard ] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },

  { path: 'admin/products', component: AdminProductsComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/products/new', component: ProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/orders', component: OrderSuccessComponent, canActivate: [ AuthGuard, AdminAuthGuard ]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
