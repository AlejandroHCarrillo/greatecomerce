import { Injectable } from '@angular/core';
import { Product } from 'shared/models/product.model';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, switchMap } from 'rxjs/operators';
import { combineLatest, of } from 'rxjs';

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
    return this.db.list('/users/' + userId + '/my-products-stats').snapshotChanges()
    .pipe( 
            map(data => 
                data.map(item => ({ key: item.payload.key, ...(item.payload.val() as {key: string, like:string, rank: number}[]) }))
            )
    );
  }

  getUserProductStats(userId: string, productId: string){
    return this.db.list('/users/' + userId + '/my-products-stats', ref => ref.child(productId) ).snapshotChanges()
    .pipe( 
            map(data => 
                data.map(item => ({ key: item.payload.key, value: item.payload.val() }))
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
    // console.log('Actualizando el producto', product);
    return this.db.object('/products/'+productId).update( product );
  }

  delete(uid:string){
    return this.db.object('/products/' + uid).remove();
  }

  setProductLike(productId: string, userId: string, likeDislike: number){    
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
    let orderColumn = 'likes';    
    
    return this.db.list('/stats', ref => ref.orderByChild(orderColumn) ).snapshotChanges()
    .pipe(
        map(data => 
          data.map(item => (
            { 
              productId: item.payload.key,
              value: item.payload.val()[orderColumn]??0,
            }
          ))))
    .pipe(
      switchMap(stadistics => {      
        return combineLatest(
          of(stadistics),
          this.db.list('/products', ref => ref.orderByKey() ).snapshotChanges().pipe(
            map(data => 
              data.map(item => (
                { 
                  productId: item.payload.key,
                  title: item.payload.val()["title"]??"",
                }
              )))
          )
        )
      }),
      map(([stats, products]) => {        
        return stats.map(stat => {
          return {
            name: products.find(p => p.productId === stat.productId).title,
            value: stat.value
          }
        })
      })
    )    
  };

  getAllUnits(){  
    return this.db.list('/units', ref => ref.orderByKey() ).snapshotChanges()
    .pipe( 
      map(items => {
        return items.map(c => ({ key: c.payload.key, unit: c.payload.val() }))
      })
    );
  }

  saveProductImages(productId:string, urls: string[]){
    let urlPath = '/products/'+ productId + '/images';
    for (let i = 0; i < urls.length; i++) {
      console.log("for url:", urls[i])
      this.db.list(urlPath).push( urls[i] );      
    }
  }

  saveProductImage(productId:string, url: string){
      let urlPath = '/products/'+ productId + '/images';
      console.log("Path: ", urlPath);
      
      this.db.list(urlPath).push( url );      
  }

  clearProductImages(productId:string){
    let urlPath = '/products/'+ productId + '/images';
    this.db.list(urlPath).snapshotChanges().forEach(x => {
        console.log(x);        
    });
  }

}
