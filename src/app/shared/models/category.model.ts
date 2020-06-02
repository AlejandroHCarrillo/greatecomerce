import { Base } from './base.model';

export class Category extends Base {
  // code: string;
  description: string;
  colorBadge?: string;
  key?: string;

  constructor(){
    super("Elmer Homero");
  }
}