import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { ShoppingCart } from 'src/app/models/shopping-cart.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [ `  ` ]
})
export class ProductsComponent implements OnInit {
  products : Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected;
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService
              ) { 

  }

  async ngOnInit() {    
   this.cart$ = await this.shoppingCartService.getCart();

    this.populateProducts();

  }

  private populateProducts(){
    let x: ShoppingCart;
    
    this.productService.getAll().pipe(
      switchMap( data => {
                  this.products = data;
                  return this.route.queryParamMap;
      })).subscribe( params => {
                    this.categorySelected = params.get('category');
                    this.applyFilter();
      });
  }

  private applyFilter(){
    let query = this.categorySelected;

    this.filteredProducts = (query) ? 
                            this.products.filter(p => p.category.toLowerCase().includes(query.toLowerCase()) ) :
                            this.products;
  }

}
