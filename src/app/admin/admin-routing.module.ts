import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'shared/services/guards/auth.guard';
import { AdminAuthGuard } from 'admin/services/guards/admin-auth.guard';
import { AdminOrdersComponent } from 'admin/components/admin-orders/admin-orders.component';
import { AdminProductsComponent } from 'admin/components/admin-products/admin-products.component';
import { ProductFormComponent } from 'admin/components/product-form/product-form.component';
import { AdminCategoriesComponent } from 'admin/components/admin-categories/admin-categories.component';
import { CategoryFormComponent } from 'admin/components/admin-categories/category-form.component';
import { AdminUsersComponent } from 'admin/components/admin-users/admin-users.component';
import { UserFormComponent } from 'admin/components/admin-users/user-form.component';

const routes: Routes = [
  { path: 'admin/products', component: AdminProductsComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/products/:id', component: ProductFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/categories', component: AdminCategoriesComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/categories/:id', component: CategoryFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/users', component: AdminUsersComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/users/:id', component: UserFormComponent, canActivate: [ AuthGuard, AdminAuthGuard ] },
  { path: 'admin/orders', component: AdminOrdersComponent , canActivate: [ AuthGuard, AdminAuthGuard ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }