import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/blog/models/post.model';
import { PostService } from 'app/blog/services/post.service';
import { Comment } from 'app/blog/models/comment.model';

@Component({
  selector: 'post-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input('postId') postId: string;
  @Input('user') user: any;

  newComment: string;

  constructor(private postService: PostService ) { }

  ngOnInit(): void {
  }

  saveComment(){
    // console.log("saving comment of this post", this.newComment, this.postId);
    // console.log(this.user);
    
    let comm = new Comment(this.postId, this.user.uid, this.user.displayName, this.user.photoURL, this.newComment);
    this.postService.createComment(comm);



  }
}
