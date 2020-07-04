export class Product{
  key: string;
  title: string;
  description?: string;
  price: number;
  category: string;
  imageUrl: string;
  uid?: string;
  like?: boolean;
  rank?: number;
  images?: { key:string, imageUrl: string }[];
}