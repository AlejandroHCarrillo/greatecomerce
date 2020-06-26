import { UnderConstructionComponent } from 'shared/components/under-construction/under-construction.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProductRankComponent } from './products/product-rank/product-rank.component';
import { SharedModule } from 'primeng/api';

const routes: Routes = [
  { path: 'admin/reports/products/rank', component: ProductRankComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
