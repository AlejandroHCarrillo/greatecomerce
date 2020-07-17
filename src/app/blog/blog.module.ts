import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './components/blogpage/blog.component';
import { BlogRoutingModule } from './blog-routing.module';
import { PostComponent } from './components/post/post.component';
import { CommentComponent } from './components/comment/comment.component';
import { SharedModule } from 'shared/shared.module';



@NgModule({
  declarations: [
    BlogComponent, 
    PostComponent, 
    CommentComponent],
  imports: [
    CommonModule, 
    SharedModule,
    BlogRoutingModule
  ]
})
export class BlogModule { }
