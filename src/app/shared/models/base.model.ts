export class Base{
  userUpdate?: string;
  updateDate?: number;

  constructor( public userCreate: string, public creationDate: number = new Date().getTime()){
  }
}