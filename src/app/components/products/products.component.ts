import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from './../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from 'src/app/services/shopping-cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [ `  ` ]
})
export class ProductsComponent implements OnInit, OnDestroy {
  products : Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected;
  cart;
  subsRef: Subscription;

  constructor(private route: ActivatedRoute,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService
              ) { 

              this.productService.getAll().pipe(
                switchMap( data => {
                            this.products = data;
                            return route.queryParamMap;
              })).subscribe( params => {
                            this.categorySelected = params.get('category');
                            this.filter(this.categorySelected);
              });

  }
  ngOnDestroy(): void {
    this.subsRef.unsubscribe();
  }

  async ngOnInit() {
    this.subsRef = (await this.shoppingCartService.getCart()).valueChanges()
               .subscribe( cart => this.cart = cart) ;
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
