import { UnderConstructionComponent } from 'shared/components/under-construction/under-construction.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VideoCatalogComponent } from 'shared/components/video-catalog/video-catalog.component';
import { GraphBarHorizontalComponent } from './components/graph-bar-horizontal/graph-bar-horizontal.component';
import { GalleryComponent } from './components/photos/gallery.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';

const routes: Routes = [
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'graph/bh/:type', component: GraphBarHorizontalComponent },
  { path: 'my/profile', component: UnderConstructionComponent },
  { path: 'videos', component: VideoCatalogComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'upload-files', component: UploadFilesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
