import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { map, switchMap } from 'rxjs/operators';
import { ShoppingCart } from 'shared/models/shopping-cart.model';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { of } from 'rxjs';

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
  currentImage: string = "";
  
  constructor(private route: ActivatedRoute,
              private cartService: ShoppingCartService, 
              private productService: ProductService,
              private userService: UserService
              ) {

    this.productId = this.route.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    // this.getProduct(this.productId, this.userId);
    // this.getUserProductStats(this.userId, this.productId);

    this.userService.getIdUserLogged
    .pipe(
      switchMap((userId) => {
        // console.log("este es el id del switchMap", userId);
        if(userId){
         this.userId = userId;
        this.getProduct(this.productId, userId);
        this.getUserProductStats(this.productId, userId);
          return userId;
        }
        return of(null);
      })
    )
    .subscribe();
   
    this.cartService.getCart().then( c => {
      c.subscribe(x => { this.shoppingCart = x});
    });
  }

  private getProduct(productId:string, userid: string){
    // console.log("productId: ", productId);
    // console.log("userid: ", userid);
    
    if (productId && productId!='new' ) {
      this.productService.getById(this.productId).snapshotChanges()
          .pipe (
              map( item => ( {                                  
                key: item.payload.key, ...(item.payload.val() as Product) 
              }) )
          ).subscribe( data => { 
            // console.log("data", data);
            
            this.product = (data as Product);
            if (data.images) {
              this.images = [];

              if(data.imageUrl) this.images.push(data.imageUrl);                              
              Object.keys(data.images).map(x => { this.images.push(data.images[x]) });
            }                            
            // this.getMyProductStats(this.userId, this.productId);
            this.getUserProductStats(this.productId, userid);
          });
    }

  }

  private getUserProductStats(productId:string, userId: string){
    this.productService.getUserProductStats(userId, productId)
      .subscribe( prodStats =>{        
        if ( prodStats ) {

          // console.log(prodStats);
          if (prodStats.length==0) return;
          if (prodStats.length==1 && prodStats[0].key == "like") {
            this.product.like = (prodStats[0].value as boolean);
            return;
          }
          if (prodStats.length==1 && prodStats[0].key == "rank") {
            this.product.rank = (prodStats[1].value as number);
            return;
          }
          if(this.product){
            this.product.like = ((prodStats[0].value||false) as boolean);
            this.product.rank = (prodStats[1].value as number)||0;
          }
        }
      });
  }

  setMyRank(rank: number){
    let rankChange = 0;
    if(this.product.rank)
      rankChange = rank - this.product.rank;

    this.product.rank = rank;
    this.productService.setProductRank(this.productId, this.userId, rank);
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

  setCurrentImg(url: string){
    this.currentImage = url;
  }
}

