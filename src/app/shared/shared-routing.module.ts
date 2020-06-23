import { UnderConstructionComponent } from 'shared/components/under-construction/under-construction.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { VideoCatalogComponent } from 'shared/components/video-catalog/video-catalog.component';

const routes: Routes = [
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'my/profile', component: UnderConstructionComponent },
  { path: 'videos', component: VideoCatalogComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
