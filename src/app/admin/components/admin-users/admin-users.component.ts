import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { User } from 'shared/models/user.model';
import { Subscription } from 'rxjs';

import { TableModule, Table } from 'primeng/table';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: [ '../../../../assets/styles/table-style.scss',
               './admin-users.component.scss' ]

})
export class AdminUsersComponent implements OnInit, OnDestroy {
  users: User[] = [];
  filteredUsers: User[] = [];
  subcription: Subscription;

  selectedUsers: User[];
  loading: boolean = true;

  pagesizes= [5, 10, 20, 30, 50, 100];

  pagesize = 10;

  @ViewChild('dt') table: Table;

  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.getUsers();
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();    
  }

  getUsers(){
    this.subcription = this.userService.getAll()
                            .subscribe( data => {
                              // console.log(data);                                          
                              this.filteredUsers =  this.users = data;
                            });
  }

  delete(userId:string){
    if( confirm("Are you sure to delete this user?") ){
      this.userService.delete(userId);
    }
  }

  filter(query: string){
    // console.log(query);
    this.filteredUsers = (query) ? 
                            this.users.filter(p => p.displayName.toLowerCase().includes(query.toLowerCase()) ) :
                            this.users;
  }

}
