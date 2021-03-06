import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableModule } from 'primeng/table';
import { SharedRoutingModule } from './shared-routing.module';

import { AuthService } from 'shared/services/auth.service';
import { CategoryService } from 'shared/services/category.service';
import { AuthGuard } from 'shared/services/guards/auth.guard';
import { OrderService } from 'shared/services/order.service';
import { ProductService } from 'shared/services/product.service';
import { ShoppingCartService } from 'shared/services/shopping-cart.service';
import { UserService } from 'shared/services/user.service';
import { VideoService } from 'shared/services/video.service';

import { ProductCardComponent } from 'shopping/components/products/product-card/product-card.component';
import { ProductQuantityComponent } from 'shopping/components/products/product-quantity.component';
import { FooterComponent } from 'shared/components/footer/footer.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { UnderConstructionComponent } from './components/under-construction/under-construction.component';
import { VideoPipe } from './pipes/video.pipe';
import { VideoCatalogComponent } from './components/video-catalog/video-catalog.component';
import { GraphBarHorizontalComponent } from './components/graph-bar-horizontal/graph-bar-horizontal.component';
import { GraphBarVerticalComponent } from './components/graph-bar-vertical/graph-bar-vertical.component';
import { GalleryComponent } from './components/photos/gallery.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { UploadFilesService } from './services/upload-files.service';

@NgModule({
  declarations: [ 
    ProductCardComponent,
    ProductQuantityComponent,
    FooterComponent,
    CarouselComponent,
    UnderConstructionComponent,
    VideoPipe,
    VideoCatalogComponent,
    GraphBarHorizontalComponent,
    GraphBarVerticalComponent,
    GalleryComponent,
    UploadFilesComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,

    SharedRoutingModule,

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,

  ],
  exports: [ 
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    VideoPipe,

    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features

    AngularFireDatabaseModule,

    UnderConstructionComponent, 
    ProductCardComponent,
    ProductQuantityComponent,
    FooterComponent,
    CarouselComponent,

    VideoCatalogComponent,
    GraphBarHorizontalComponent,
    GraphBarVerticalComponent,
    GalleryComponent,
    UploadFilesComponent
  ],
  providers: [
    AuthService,
    AuthGuard, 
    UserService,
    CategoryService,
    ProductService,
    ShoppingCartService, 
    OrderService,
    VideoService,
    UploadFilesService
  ]

})
export class SharedModule { }
