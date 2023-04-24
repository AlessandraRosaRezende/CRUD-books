import { Identifiable, NewEntity } from '..';

export interface IModelReader<T> {
  find(id: Identifiable['id']): Promise<T | null>,
  findAll(): Promise<T[]>,
  findByQuery(q: string): Promise<T[]>
}

export interface IModelWriter<T> {
  create(data: NewEntity<T>): Promise<T>,
  update(id: Identifiable['id'], data: Partial<T>): Promise<T | null>,
  delete(id: Identifiable['id']): Promise<void>
}

export interface IModel<T> extends IModelReader<T>, IModelWriter<T> { }
