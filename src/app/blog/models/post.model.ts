import { Comment } from '../models/comment.model';

export class Post{
  constructor( public post: string, 
               public userId: string,
               public userName: string = "",
               public photoURL: string = "",
               public publishDate: number = new Date().getTime(),
               public key?: string,
               public comments?: Comment[]
              ){

  }
}