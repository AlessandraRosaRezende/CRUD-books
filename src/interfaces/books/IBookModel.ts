import { IBook, INewBook } from './IBook';

export interface IBookModel {
  find(id: IBook['id']): Promise<IBook | null>,
  findAll(): Promise<IBook[]>,
  findByQuery(q: string): Promise<IBook[]>
  create(data: INewBook): Promise<IBook>,
  update(id: IBook['id'], data: Partial<INewBook>): Promise<IBook | null>,
  delete(id: IBook['id']): Promise<void>
}
