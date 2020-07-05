import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
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

  userProdStats: any;

  constructor(private route: ActivatedRoute,
              private authService: AuthService,
              private productService: ProductService,
              private shoppingCartService: ShoppingCartService
              ) { 

  }

  async ngOnInit() {
    this.authService.appUser$
    .pipe(
      switchMap((fireUser) =>  {
        this.appUser = fireUser;
        
        if (fireUser) {
          this.productService.getUserProductsStats(this.appUser.uid)
          .subscribe(data => {
            this.userProdStats = data;
            this.populateUserStats();            
          })
          ;
        }
        return of(fireUser);
      } )
    )
    .subscribe( fireUser => {
        this.appUser = fireUser;
      } );

    this.cart$ = await this.shoppingCartService.getCart();
    this.populateProducts();
  }

  private populateProducts(){
    // let x: ShoppingCart;
    
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

  private populateUserStats(){
    // console.log("this.userProdStats: ", this.userProdStats);

    // if (!this.userProdStats){
    //   console.log("todavia no llegan las estadisticas...");      
    // }

    this.filteredProducts.forEach(p =>{
      if (!p) return false;

      // console.log("filt prod:", p.key);
      
      const found = this.userProdStats.find((userStat : {key: string, like: boolean, rank: number}) => { 
        // console.log("element: ", userStat);
        // console.log(userStat.key);
        // console.log(p.key);
        
        if (userStat) {
          if(userStat.key === p.key){
            p.like = userStat.like;
            p.rank = userStat.rank;
          }
        }
      } );

      // console.log("found", p.key, found);
    });
  }

}
