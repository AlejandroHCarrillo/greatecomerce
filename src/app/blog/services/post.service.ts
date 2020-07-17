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

  getAllPosts(){
    return this.db.list('/posts', ref => ref.orderByChild('publishDate')).snapshotChanges()
    .pipe( 
            map(data => 
              data.map(item => ({ key: item.payload.key, ...(item.payload.val() as Post) }))
            )
    )
  }

  createComment(comment: Comment){
    // console.log('Guardando el comentario del post');
    return this.db.list('/posts/' + comment.postId + '/comments').push( comment );
  }


}
