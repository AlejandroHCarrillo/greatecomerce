import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';

import { CheckoutComponent } from './shopping/components/checkout/checkout.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyOrdersComponent } from './shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './shopping/components/order-success/order-success.component';
import { ProductsComponent } from './shopping/components/products/products.component';
import { ShoppingCartComponent } from './shopping/components/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent},
  // { path: 'products/:category', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },

  { path: 'check-out', component:CheckoutComponent, canActivate: [ AuthGuard ] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
