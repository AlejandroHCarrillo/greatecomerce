import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { map } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [ `.container{ min-height: 80vh; margin-top: .1rem; }` ]
})
export class ProductDetailComponent implements OnInit {
  userId: string;
  shoppingCart: ShoppingCart;

  stars=['*','*','*','*','*'];

  productId: string;
  product: Product;
  images: string[] = [];
  
  constructor(private route: ActivatedRoute,
              private cartService: ShoppingCartService, 
              private productService: ProductService,
              private userService: UserService
              ) {

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId && this.productId!='new' ) {
      this.productService.getById(this.productId).snapshotChanges()
                          .pipe (
                              map( item => ( {                                  
                                key: item.payload.key, ...(item.payload.val() as Product) 
                              }) )
                          ).subscribe( data => { 
                            this.product = (data as Product);
                            if (data.images) {
                              this.images = [];

                              if(data.imageUrl) this.images.push(data.imageUrl);                              
                              Object.keys(data.images).map(x => { this.images.push(data.images[x]) });
                            }                            
                            this.getMyProductStats(this.userId, this.productId);
                          });
    }
   }

  ngOnInit() {
    if(localStorage.getItem("ecuser")){
      this.userId = localStorage.getItem("ecuser"); 
    }
    
    this.productService.getUserProductStats(this.userId, this.productId)
      .subscribe( prodStats =>{        
        if(prodStats ){

          if (prodStats.length==0) return;
          if (prodStats.length==1 && prodStats[0].key == "like") {
            this.product.like = (prodStats[0].value as boolean);
            return            
          }
          if (prodStats.length==1 && prodStats[0].key == "rank") {
            this.product.rank = (prodStats[1].value as number);
            return
          }

          this.product.like = (prodStats[0].value as boolean);
          this.product.rank = (prodStats[1].value as number);

        }        
          
      })
    ;

    
    // this.userId = await this.userService.logUserId;
    // .UserIdObservable
    // .subscribe(id => {
    //   this.userId = id;
    //   this.productService.getUserProductStats(id, this.productId);
    //  } );
    // console.log("userId: ", this.userId);
    
    this.cartService.getCart().then( c => {
      c.subscribe(x => { this.shoppingCart = x});
    });
  }

  setMyRank(rank: number){
    let rankChange = 0;
    if(this.product.rank)
      rankChange = rank - this.product.rank;

    this.product.rank = rank;
    this.productService.setProductRank(this.product.key, this.userId, rank);
  }

  toggleLike(){
    this.product.like = !this.product.like;
    this.productService.setProductLike(this.product.key, this.userId, this.product.like ? 1 : -1);
  }

  addToCart(){ 
    this.cartService.addToCart(this.product);
  }

  getMyProductStats(userId: string, productId: string){
    this.productService.getUserProductStats(userId, productId);
  }

}
