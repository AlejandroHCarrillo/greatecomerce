import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
  ]
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(private categoryService: CategoryService,
              private productService: ProductService) {
    this.categories$ = categoryService.getCategories();    
   }

  ngOnInit(): void {
  }

  save(product:any){
    console.log('saving form: ', product);
    this.productService.create(product);
  }

}
