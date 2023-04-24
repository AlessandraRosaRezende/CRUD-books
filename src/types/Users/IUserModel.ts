import { Identifiable, NewEntity } from '..';
import ILogin from '../../interfaces/ILogin';

export interface IModelReader<T> {
  findAll(): Promise<T[]>,
  findOne(data: Omit<ILogin, "password">): Promise<T | null>,
}

export interface IModelWriter<T> {
  create(data: NewEntity<T>): Promise<T>,
}

export interface IModel<T> extends IModelReader<T>, IModelWriter<T> { }
