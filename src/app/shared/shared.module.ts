import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { AuthGuard } from 'shared/services/guards/auth.guard';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';


import { ProductCardComponent } from '../shopping/components/products/product-card.component';
import { ProductQuantityComponent } from '../shopping/components/products/product-quantity.component';

@NgModule({
  declarations: [ 
    ProductCardComponent,
    ProductQuantityComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,

  ],
  exports: [ 
    FormsModule,
    TableModule,

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,

    ProductCardComponent,
    ProductQuantityComponent
  ],
  providers: [
    AuthService,
    AuthGuard, 
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService, 
    OrderService
  ]

})
export class SharedModule { }
