import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Post } from '../models/post.model';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private db:AngularFireDatabase) { }

  createPost(post: Post){
    // console.log('Guardando el post');
    return this.db.list('/posts/').push( post );
  }

  deletePost(postId: string){
    let url = '/posts/' + postId ;
    console.log(url);
    this.db.object(url).remove();
  }

  getAllPosts(){
    return this.db.list('/posts', ref => ref.orderByChild('publishDate')).snapshotChanges()
    .pipe( 
            map(data => 
              data.map(
                item => {
                  // let postItem: any = item.payload.val();
                  let newPost: any = item.payload.val();       
                  let comments: any[] = newPost.comments;

                  newPost.key = item.key;
                  newPost.comments = [];

                  if(comments){
                    Object.keys(comments).forEach(commentKey => {
                      let newComment: any = { key: commentKey,  ...comments[commentKey]};

                      if(!newComment.photoURL || newComment.photoURL === undefined || newComment.photoURL === ''){
                        newComment.photoURL = 'assets/images/default-user-profile.png';
                      }
                      
                      newPost.comments.push( newComment );
                    });
                  }
                  // console.log("Este es el post de regreso:", newPost);
                  return newPost;
                }
                // item => ({ key: item.payload.key, ...(item.payload.val() as Post) })
                )
            )
    );
  }

  createComment(comment: Comment){
    // console.log('Guardando el comentario del post');
    return this.db.list('/posts/' + comment.postId + '/comments').push( comment );
  }

  deleteComment(postId: string, commentKey: string){
    let url = '/posts/' + postId + '/comments/' + commentKey;
    // console.log(url);
    this.db.object(url).remove();
  }


}
