import { Component, OnInit } from '@angular/core';
import { Post } from 'app/blog/models/post.model';
import { PostService } from 'app/blog/services/post.service';
import { post } from 'jquery';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  newPost: string = "Este es un post de prueba";
  posts: Post[] = [];

  constructor(private postService: PostService ) { }

  ngOnInit(): void {
    this.loadPosts();
  }

  publishPost(){
    let post = new Post(this.newPost, "ELMERHOMERO")
    console.log("publishing post: ", post);
    this.postService.createPost(post);
  }

  loadPosts(){
    this.postService.getAllPosts()
      .subscribe(resp =>{
        console.log(resp);
        resp.forEach(x => {
            this.posts.unshift(x);
        });
        console.log(this.posts);
        // this.posts = resp
      })
  }

}
