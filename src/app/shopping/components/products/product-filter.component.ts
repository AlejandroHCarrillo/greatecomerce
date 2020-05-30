import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styles: [ `
              .sticky-top{ top: 80px; }"
            `]
})
export class ProductFilterComponent implements OnInit {
  categories$;
  @Input('category') category;

  constructor(private categoryService: CategoryService) { 
    
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categories$ = this.categoryService.getAll();    
  }

}
