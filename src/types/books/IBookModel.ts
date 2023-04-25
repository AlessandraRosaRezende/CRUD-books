import { Identifiable, NewEntity } from '..';
import { IBook } from './IBook';

export interface IBookModel {
  find(id: Identifiable['id']): Promise<IBook | null>,
  findAll(): Promise<IBook[]>,
  findByQuery(q: string): Promise<IBook[]>
  create(data: NewEntity<IBook>): Promise<IBook>,
  update(id: Identifiable['id'], data: Partial<NewEntity<IBook>>): Promise<IBook | null>,
  delete(id: Identifiable['id']): Promise<void>
}