import { ProductRankComponent } from './products/product-rank/product-rank.component';
import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    ProductRankComponent
  ],
  imports: [
    ReportsRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule
  ],
  exports: [
    ProductRankComponent
  ]
})
export class ReportsModule { }
