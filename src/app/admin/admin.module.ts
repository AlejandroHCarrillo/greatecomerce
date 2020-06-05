import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'admin/components/product-form/product-form.component';
import { AdminAuthGuard } from 'admin/services/guards/admin-auth.guard';
import { SharedModule } from 'shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminCategoriesComponent } from 'admin/components/admin-categories/admin-categories.component';
import { CategoryFormComponent } from 'admin/components/admin-categories/category-form.component';
import { AdminUsersComponent } from 'admin/components/admin-users/admin-users.component';
import { UserFormComponent } from 'admin/components/admin-users/user-form.component';

@NgModule({
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    AdminCategoriesComponent,
    CategoryFormComponent,
    AdminUsersComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,

    AdminRoutingModule,

  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
