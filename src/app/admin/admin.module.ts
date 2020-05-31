import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'admin/components/product-form/product-form.component';
import { AdminAuthGuard } from 'admin/services/guards/admin-auth.guard';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';


@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

    FormsModule,
    TableModule,

    SharedModule
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
