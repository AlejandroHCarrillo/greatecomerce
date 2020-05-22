import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [ ` 
              form { padding-top: 10px; }
              div.card { margin-top: 40px; }

            `
  ]
})
export class ProductFormComponent implements OnInit {
  categories$;
  product = new Product();
  productId : string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getCategories();    
    this.productId = this.route.snapshot.paramMap.get('id');
    
    if (this.productId && this.productId!='new' ) {
      this.productService.getById(this.productId).snapshotChanges()
                          .pipe (
                              map( item => ( {                                             
                                key: item.payload.key, ...(item.payload.val() as Product) 
                              }) )
                          ).subscribe(data => { console.log(data);
                            
                            this.product = data;
                          });
    }
  }

  ngOnInit(): void {
  }

  save(product:any){
    if(this.productId == "new") {
      // console.log('saving form: ', product);
      this.productService.create(product);
    } else {
      // console.log('Actualizando', product);      
      this.productService.update(this.productId, product);      
    }
    this.router.navigate(['admin/products']);
  }

  delete(){
    if( confirm("¿En verdad desea eliminar este producto?") ){
      this.productService.delete(this.productId);
      this.router.navigate(['admin/products']);
    }
  }

}
