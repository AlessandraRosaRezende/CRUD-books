import { Identifiable } from '../ICRUDModel';

export interface IBook extends Identifiable{
  title: string,
  price: number,
  author: string,
  isbn: string,
}
