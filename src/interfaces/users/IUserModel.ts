import ILogin from './ILogin';
import { INewUser, IUser } from './IUser';

export interface IUserModel {
  findAll(): Promise<IUser[]>,
  findOne(email: ILogin['email']): Promise<IUser | null>,
  create(data: INewUser): Promise<IUser>,
}
