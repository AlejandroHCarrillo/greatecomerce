import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';
import { CheckoutComponent } from 'shopping/components/checkout/checkout.component';
import { MyOrdersComponent } from 'shopping/components/my-orders/my-orders.component';
import { OrderSuccessComponent } from 'shopping/components/order-success/order-success.component';
import { ShoppingCartComponent } from 'shopping/components/shopping-cart/shopping-cart.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent},
  { path: 'shopping-cart', component: ShoppingCartComponent },
  { path: 'check-out', component:CheckoutComponent, canActivate: [ AuthGuard ] },
  { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [ AuthGuard ] },
  { path: 'my/orders', component: MyOrdersComponent, canActivate: [ AuthGuard ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShoppingRoutingModule { }
