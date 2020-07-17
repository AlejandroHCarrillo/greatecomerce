export class Post{
  constructor( public post: string, 
               public userId: string,
               public userName: string = "",
               public userUrlImage: string = "",
               public publishDate: number = new Date().getTime(),
               public key?: string
              ){

  }
}