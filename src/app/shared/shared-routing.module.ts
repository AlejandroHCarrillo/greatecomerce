import { UnderConstructionComponent } from 'shared/components/under-construction/under-construction.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'under-construction', component: UnderConstructionComponent },
  { path: 'my/profile', component: UnderConstructionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
