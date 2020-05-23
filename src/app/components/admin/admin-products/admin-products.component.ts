import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product.model';
import { Subscription } from 'rxjs';

import { TableModule, Table } from 'primeng/table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: [ './admin-products.component.scss' ]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  subcription: Subscription;

  cols: any[];
  selectedProducts: Product[];
  loading: boolean = true;
  @ViewChild('dt') table: Table;

  constructor(private productService: ProductService) { }
  
  ngOnInit(): void {
    
    this.cols = [
      { field: 'imageUrl', header: 'Img' },
      { field: 'title', header: 'Title' },
      { field: 'category', header: 'Category' },
      { field: 'price', header: 'Price' }
    ];
    this.getProducts();
    this.loading = false;
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
