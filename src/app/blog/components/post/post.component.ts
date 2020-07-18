import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'app/blog/models/post.model';

@Component({
  selector: 'blog-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input("post") post: Post;
  @Input("user") user: any;

  constructor() { }

  ngOnInit(): void {
  }

}
