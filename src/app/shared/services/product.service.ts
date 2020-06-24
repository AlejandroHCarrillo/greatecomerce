import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }
  
  getAll(){
    return this.db.list('/products', ref => ref.orderByChild('name')).snapshotChanges()
    .pipe( 
            map(data => 
              data.map(item => ({ key: item.payload.key, ...(item.payload.val() as Product) }))
            )
    )
  }

  getUserProductsStats(userId: string){
    // console.log("the user to getUserProductsStats is: ", userId);
    // console.log('/users/' + userId + '/my-products-stats');
    
    return this.db.list('/users/' + userId + '/my-products-stats').snapshotChanges()
    .pipe( 
            map(data => 
                data.map(item => ({ key: item.payload.key, ...(item.payload.val() as {key: string, like:string, rank: number}[]) }))
            )
    );
  }



  getById(uid: string) {
    return this.db.object('/products/' + uid);
  }

  create(product:Product){
    // console.log('Guardando el producto');
    return this.db.list('/products/').push( product );
  }

  update(productId:string, product:Product){
    console.log('Actualizando el producto', product);
    return this.db.object('/products/'+productId).update( product );
  }

  delete(uid:string){
    return this.db.object('/products/' + uid).remove();

  }

  setProductLike(productId: string, userId: string, likeDislike: number){
    // console.log(productId, " like:", likeDislike);
    
    let prod = this.db.object('/stats/' + productId);
    let totalLikes = 0;

    this.db.object('/users/' + userId + '/my-products-stats/' + productId + '/like').set(likeDislike<0?0:1);
    
    if (!prod){
      this.db.list('/stats/').push( { productId: { likes: 1 } } );      
      prod = this.db.object('/stats/' + productId );      
    } 
        
    let subscription = prod.snapshotChanges().subscribe(x => {
      let data = (x.payload.val() as any);        
      
      if (!data){
        this.db.object('/stats/'+ productId + '/' + userId + '/like').set(1);
        this.db.object('/stats/'+ productId + '/likes').set(1);

        subscription.unsubscribe();
        return;
      } 

      if (!data.hasOwnProperty(userId) ){
        this.db.object('/stats/'+ productId + '/' + userId + '/like').set(1);
        // this.db.object('/stats/'+ productId + '/likes').set( 1 );
      }

      if (data.likes !== undefined ){
        totalLikes = (x.payload.val() as any).likes;
      }
                  
      this.db.object('/stats/'+ productId + '/' + userId + '/like').set( likeDislike<0?0:1 );      
      this.db.object('/stats/'+ productId + '/likes').set(totalLikes + likeDislike);
      subscription.unsubscribe();
    });

  }

  setProductRank(productId: string, userId: string, rank: number){
    let prod = this.db.object('/stats/' + productId);
    let totalCounter = 0;
    let globlaRank = 0;

    this.db.object('/users/' + userId + '/my-products-stats/' + productId + '/rank').set(rank);
    
    if (!prod){
      this.db.list('/stats/').push( { productId: { userId: { rank: rank } } } );
      prod = this.db.object('/stats/' + productId );
    } 
    
    let subscription = prod.snapshotChanges().subscribe(x => {
      let data = (x.payload.val() as any);

      if (!data){
        // console.log("No habia datos");
        
        this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
        this.db.object('/stats/'+ productId + '/totalCounter').set(1);
        this.db.object('/stats/'+ productId + '/globalRank').set(rank);

        subscription.unsubscribe();
        return;
      } 

      if (!data.hasOwnProperty(userId) ){
        this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
      }

      let rankdiff = rank;
      
      if(data[userId].rank !== undefined){
        rankdiff =  rank - data[userId].rank;
      }
    
      if (data.totalCounter !== undefined){
        totalCounter = data.totalCounter;
      }

      if (data.globalRank !== undefined){
        globlaRank = data.globalRank;
      }

      this.db.object('/stats/'+ productId + '/' + userId + '/rank').set(rank);
      this.db.object('/stats/'+ productId + '/globalRank').set(globlaRank + rankdiff);

      subscription.unsubscribe();
    });

  }

  getProductLikes(){
    // console.log("getProductLikes: ");
    let orderColumn = 'globalRank';    
    return this.db.list('/stats', ref => ref.orderByChild(orderColumn) ).snapshotChanges().pipe(      
        map((data => 
          data.map(item => (
            { 
              name: item.payload.key,
              value: item.payload.val()[orderColumn]??0,
              // product: item.payload.key, 
              // likes: item.payload.val()["likes"]??0, 
              // globalRank: item.payload.val()["globalRank"]??0, 
              // totalCounter: item.payload.val()["totalCounter"]??0 
            }
          ))
        )

      ))
  };

  

}
