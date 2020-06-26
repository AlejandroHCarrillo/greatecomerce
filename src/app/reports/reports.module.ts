import { ProductRankComponent } from './products/product-rank/product-rank.component';
import { NgModule } from '@angular/core';
import { ReportsRoutingModule } from './reports-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from 'shared/shared.module';

@NgModule({
  declarations: [
    ProductRankComponent
  ],
  imports: [
    ReportsRoutingModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    SharedModule,
  ],
  exports: [
    ProductRankComponent
  ]
})
export class ReportsModule { }
