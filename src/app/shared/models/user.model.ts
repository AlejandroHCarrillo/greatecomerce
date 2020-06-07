import { Base } from './base.model';

export class User extends Base {
  
  public displayName: string;
  public uid?: string;
  public usuario?: string;
  public email?: string;
  public photoURL?: string;
  
  public role?: string;
    
  constructor( creationUserId:string ) {
    super(creationUserId);
  }
}