import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'shared/services/product.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit {
  @Input('userId') userId: string;

  stars=['*','*','*','*','*'];

  productId: string;
  product: Product;
  images: string[] = [];
  
  constructor(private route: ActivatedRoute,
              private productService: ProductService) {

    this.productId = this.route.snapshot.paramMap.get('id');

    if (this.productId && this.productId!='new' ) {
      this.productService.getById(this.productId).snapshotChanges()
                          .pipe (
                              map( item => ( {                                  
                                key: item.payload.key, ...(item.payload.val() as Product) 
                              }) )
                          ).subscribe( data => { 
                            // console.log(data);                            
                            this.product = (data as Product);
                            if (data.images) {
                              // console.log(data.images);
                              
                              Object.keys(data.images).map(x => { this.images.push(data.images[x]) });
                              // this.images = Object.values(data.images);
                              // console.log("the images: ",  this.images );
                            }                            
                            
                          });
    }
   }

  ngOnInit(): void {
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


}
