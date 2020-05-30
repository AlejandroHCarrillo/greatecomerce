import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'shared/shared.module';
import { ShippingFormComponent } from 'shopping/components/checkout/shipping-form.component';
import { ShoppingCartSummaryComponent } from 'shopping/components/checkout/shopping-cart-summary.component';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { ProductFilterComponent } from './components/products/product-filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { AppRoutingModule } from 'app/app-routing.module';

@NgModule({
  declarations: [
    ShoppingCartSummaryComponent,
    ShippingFormComponent, 
    CheckoutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,

    FormsModule,
    SharedModule
  ],
  exports: [
    ShoppingCartSummaryComponent,
    ShippingFormComponent, 
    CheckoutComponent,
    MyOrdersComponent,
    OrderSuccessComponent,
    ProductsComponent,
    ShoppingCartComponent,
    ProductFilterComponent,

  ]
})
export class ShoppingModule { }
