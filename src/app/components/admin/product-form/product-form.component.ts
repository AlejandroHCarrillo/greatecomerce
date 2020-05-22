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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getCategories();    
    let productId = this.route.snapshot.paramMap.get('id');
    
    if (productId && productId!='new' ) {
      this.productService.getById(productId).snapshotChanges()
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
    // console.log('saving form: ', product);
    this.productService.create(product);
    this.router.navigate(['admin/products']);
  }

}
