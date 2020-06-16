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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';

import { ProductCardComponent } from 'shopping/components/products/product-card.component';
import { ProductQuantityComponent } from 'shopping/components/products/product-quantity.component';
import { FooterComponent } from 'shared/components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [ 
    ProductCardComponent,
    ProductQuantityComponent,
    FooterComponent,
    CarouselComponent,
    UnderConstructionComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    TableModule,

    SharedRoutingModule,

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

    UnderConstructionComponent, 
    ProductCardComponent,
    ProductQuantityComponent,
    FooterComponent,
    CarouselComponent

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
