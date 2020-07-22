import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/blog/models/post.model';
import { PostService } from 'app/blog/services/post.service';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input("post") post: Post;
  @Input("user") user: any;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  deletePost(postId: string){
    if(confirm('are you sure delete this Post?')){
      // console.log('deleting Post: ', postId);
      this.postService.deletePost(postId);
    }
  }

  deleteComment(postId: string, commentKey: string){
    if(confirm('are you sure delete this comment?')){
      // console.log('deleting comment: ', commentKey);
      this.postService.deleteComment(postId, commentKey);
    }
  }
}
