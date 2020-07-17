export class Comment{
  constructor( 
               public postId: string,
               public userId: string,
               public userName: string = "",
               public userUrlImage: string = "",
               public comment: string, 
               public publishDate: number = new Date().getTime()
              ){
  }
}