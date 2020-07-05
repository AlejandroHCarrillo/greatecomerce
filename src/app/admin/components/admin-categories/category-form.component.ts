import { Component, OnInit } from '@angular/core';
import { Category } from 'shared/models/category.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from 'shared/services/category.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  loggedUserId : string = "";
  
  colors= [
    {colorBadge: "green"},
    {colorBadge: "red"},
    {colorBadge: "brown"},
    {colorBadge: "blue"},
    {colorBadge: "purple"},
    {colorBadge: "brown2"}
  ];

  category = new Category();
  categoryId : string;

  constructor( private router: Router,
               private route: ActivatedRoute,
               private categoryService: CategoryService,
               private userService: UserService
    ) {
    this.categoryId = this.route.snapshot.paramMap.get('id');

    if (this.categoryId && this.categoryId!='new' ) {
      this.categoryService.getById(this.categoryId)
                          .subscribe(cat => {
                            // console.log(cat);                            
                            this.category.key = cat.key;
                            // this.category.code = cat.key;
                            this.category.description = cat.description;
                            this.category.colorBadge = cat.colorBadge??"";                            
                          } );
    }
   }

  ngOnInit(): void {
    this.loggedUserId = this.userService.logUserId;
    // this.userService.UserIdObservable
    // .subscribe(id => {
    //  //  console.log("userId: ", id);
    //   this.loggedUserId = id;
    //  } );
  }

  save(category: Category){
    if(this.categoryId == "new") {
      // console.log('saving form: ', category);
      category.userCreate = this.loggedUserId;;
      category.creationDate = new Date().getTime();
      // this.categoryService.create(category);
    } else {
      console.log('Actualizando', category);
      category.userUpdate = this.loggedUserId;
      category.updateDate = new Date().getTime();
      // this.categoryService.update(this.categoryId, category);      
    }
    this.categoryService.setCategory( category );
    this.router.navigate(['admin/categories']);
  }

  delete(){
    if( confirm("¿En verdad desea eliminar este producto?") ){
      console.log("delete soon");
      alert("Is not possible delete categories yet");
    }
  }

}
