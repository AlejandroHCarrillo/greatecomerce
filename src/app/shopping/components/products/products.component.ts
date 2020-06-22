import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Product } from 'shared/models/product.model';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { User } from 'shared/models/user.model';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [ `  ` ]
})
export class ProductsComponent implements OnInit {
  appUser: User;
  products : Product[] = [];
  filteredProducts: Product[] = [];
  categorySelected;
  cart$: Observable<ShoppingCart>;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService
              ) { 

  }

  async ngOnInit() {
    this.authService.appUser$.subscribe( fireUser => this.appUser = fireUser );

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
