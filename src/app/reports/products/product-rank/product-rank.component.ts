import { Component, NgModule, OnDestroy } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ProductService } from 'shared/services/product.service';
// import { single } from './data';

@Component({
  selector: 'app-product-rank',
  templateUrl: './product-rank.component.html',
  styleUrls: ['./product-rank.component.css']
})
export class ProductRankComponent implements OnDestroy {

  data: any[] = [
  {
    "name": "Germany",
    "value": 8940000
  },
  {
    "name": "USA",
    "value": 5000000
  },
  {
    "name": "France",
    "value": 7200000
  }
];

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
    // Object.assign(this, { single })
    this.getData();
    // this.refInterval = setInterval(()=>{
    //                       console.log("tick");
    //                       const newResults =  [...this.data];
    //                       for (let item in newResults) {
    //                         newResults[item].value = Math.round( Math.random() * 500 );
    //                       }
    //                       this.data = [...newResults]
                          
    //                     }, 1500 );
  }

  ngOnDestroy(): void {
    clearInterval( this.refInterval );
  }

  onSelect(event) {
    console.log(event);
  }

  private async getData(){
    await this.prodService.getProductLikes()
              .subscribe(data => {
                console.log(data);
                let tempData : any[] = [];
                for (const item of data) {
                  tempData.unshift(item);
                }
                this.data = tempData;
              })
  }
}