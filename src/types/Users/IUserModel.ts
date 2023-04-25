import { NewEntity } from '..';
import ILogin from '../../interfaces/ILogin';
import { IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>,
  findOne(email: ILogin['email']): Promise<IUser | null>,
  create(data: NewEntity<IUser>): Promise<IUser>,
}
