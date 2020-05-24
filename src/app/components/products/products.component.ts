import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [ `  ` ]
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected;


  constructor(private route: ActivatedRoute,
              private productService: ProductService) { 

              this.productService.getAll().pipe(
                switchMap( data => {
                            this.products = data;
                            return route.queryParamMap;
              })).subscribe( params => {
                            this.categorySelected = params.get('category');
                            this.filter(this.categorySelected);
              });

  }

  ngOnInit(): void {

  }

  getProducts(){
    this.productService.getAll().subscribe( data => {
      this.products = data;
      this.filteredProducts = this.products;
    });
  }

  filter(query: string){
    this.filteredProducts = (query) ? 
                            this.products.filter(p => p.category.toLowerCase().includes(query.toLowerCase()) ) :
                            this.products;
  }

}
