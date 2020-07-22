export class Comment{
  public key?: string;
  constructor( 
               public postId: string,
               public userId: string,
               public userName: string = "",
               public photoURL: string = "",
               public comment: string, 
               public publishDate: number = new Date().getTime()
              ){
  }
}