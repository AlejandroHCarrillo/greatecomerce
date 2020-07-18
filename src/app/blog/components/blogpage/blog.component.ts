import { Component, OnInit } from '@angular/core';
import { Post } from 'app/blog/models/post.model';
import { PostService } from 'app/blog/services/post.service';
import { UserService } from 'shared/services/user.service';
import { User } from 'shared/models/user.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  currentUser: User;
  newPost: string = "";
  posts: Post[] = [];

  constructor(private postService: PostService, public userService: UserService ) { 


  }

  ngOnInit(): void {
    this.userService.getUserLogged.subscribe( u => {
      this.currentUser = (u as User);
    } );

    this.loadPosts();
  }

  publishPost(){
    // console.log("currentUser.uid: ", this.currentUser.uid);
    let post = new Post(this.newPost, this.currentUser.uid )
    
    post.key = null;
    post.comments = null;

    post.userName = this.currentUser.displayName;
    post.photoURL = this.currentUser.photoURL;

    // console.log("publishing post: ", post);

    this.postService.createPost(post);
  }

  loadPosts(){
    this.postService.getAllPosts()
      .subscribe(resp =>{
        console.log(resp);
        if(resp){
          this.posts = [];
          resp.forEach(post => {
            // console.log("x.comments", x.comments);
            if(post.comments) {
              // console.log("comments array", Object.values(x.comments));
              post.comments = Object.values(post.comments);
            }
              this.posts.unshift(post);
        });}
        // console.log(this.posts);
        // this.posts = resp
      })
  }

}
