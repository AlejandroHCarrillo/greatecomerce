import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrls: ['./admin-categories.component.css']
})
export class AdminCategoriesComponent implements OnInit {
  categories$;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(){
    this.categories$ = this.categoryService.getAll();    
  }

  delete(categoryId:string){
    if( confirm("¿En verdad desea eliminar este producto?") ){
        console.log("delete soon");
        alert("Is not possible delete categories yet.");
      // this.categoryService.delete(categoryId);
    }
  }

}
