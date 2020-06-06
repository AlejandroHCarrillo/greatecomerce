import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'shared/services/category.service';
import { UserService } from 'shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from 'shared/models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styles: [ ` 
              form { padding-top: 10px; }
              div.card { margin-top: 40px; }

            `
  ]
})
export class UserFormComponent implements OnInit {
  roles;
  loggedUserId : string = "";
  user = new User(this.loggedUserId);
  userId : string;
  editMode: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userService: UserService) {

    this.userId = this.route.snapshot.paramMap.get('id');
    
    if (this.userId && this.userId!='new' ) {
      this.userService.getById(this.userId).snapshotChanges()
                          .pipe (
                              map( item => ( {                                             
                                key: item.payload.key, ...(item.payload.val() as User) 
                              }) )
                          ).subscribe(data => {
                            if(!data.role) data.role = "guest"; 
                            if(data.isAdmin) data.role = "admin"; 

                            this.user = data;
                          });
    }
  }

  async  ngOnInit() {
    this.userService.getAllroles()
    .subscribe( roles => {
      this.roles = Object.entries(roles);
    });

     this.userService.getIdUserLogged
     .subscribe(id => {
      //  console.log("userId: ", id);
       this.loggedUserId = id;
      } );
    //  console.log("Este es el id del usuario loggeado", this.loggedUser);
  }

  save(user:User){
    if(this.userId == "new") {
      // console.log('saving form: ', user);
      user.userCreate = this.loggedUserId;
      user.creationDate = new Date().getTime() ;
      this.userService.create(user);
    } else {
      // console.log('Actualizando', user);      
      user.userUpdate = this.loggedUserId;
      user.updateDate = new Date().getTime() ;
      this.userService.update(this.userId, user);      
    }
    this.router.navigate(['admin/users']);
  }

  delete(){
    if( confirm("¿En verdad desea eliminar este usuario?") ){
      this.userService.delete(this.userId);
      this.router.navigate(['admin/users']);
    }
  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

}
