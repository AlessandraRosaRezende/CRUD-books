import { Identifiable, NewEntity } from '..';

export interface IModelReader<T> {
  findAll(): Promise<T[]>,
}

export interface IModelWriter<T> {
  // create(data: NewEntity<T>): Promise<T>,
}

export interface IModel<T> extends IModelReader<T>, IModelWriter<T> { }
