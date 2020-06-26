import { Component, NgModule, OnDestroy } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductService } from 'shared/services/product.service';
import { Observable } from 'rxjs';
// import { single } from './data';

@Component({
  selector: 'app-product-rank',
  templateUrl: './product-rank.component.html',
  styleUrls: ['./product-rank.component.css']
})
export class ProductRankComponent implements OnDestroy {
  data$: Observable<any[]>;

  data: any[] = [];
  refInterval: any;
  // multi: any[];
  // view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient  = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Products';
  showYAxisLabel = true;
  yAxisLabel = 'Likes';

  // colorScheme = 'nightLights'
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#1abc9c', '#8e44ad', '#34495e', '#2ecc71', '#7f8c8d', '#e67e22', '#34495e', '#9b59b6', '#16a085', '#f39c12', '#3498db', '#c0392b', '#f1c40f']
  };

  constructor( private prodService: ProductService ) {
    // this.getData();
    this.getObsData();
  }

  ngOnDestroy(): void {
    clearInterval( this.refInterval );
  }

  onSelect(event) {
    console.log(event);
  }

  private getObsData(){
    this.data$ = this.prodService.getProductLikes();
  }

  private async getData(){
    await this.prodService.getProductLikes()
              .subscribe(data => {
                let tempData : any[] = [];
                for (const item of data) {
                  tempData.unshift(item);
                }
                this.data = tempData;
              })

  }

}