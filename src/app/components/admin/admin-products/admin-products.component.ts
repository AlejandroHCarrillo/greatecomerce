import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styles: [
  ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subcription: Subscription;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();    
  }

  getProducts(){
    this.subcription = this.productService.getAll()
                                          .subscribe( data => { this.filteredProducts =  this.products = data });
  }

  delete(productId:string){
    if( confirm("¿En verdad desea eliminar este producto?") ){
      this.productService.delete(productId);
    }
  }

  filter(query: string){
    console.log(query);
    this.filteredProducts = (query) ? 
                            this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase()) ) :
                            this.products;
  }

}
