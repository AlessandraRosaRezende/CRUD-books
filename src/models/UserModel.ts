import User from '../database/models/User';
import { NewEntity } from '../types';
import { IUser } from '../types/users/IUser';
import { IUserModel } from '../types/users/IUserModel';

export default class UserModel implements IUserModel {
  findAll = (): Promise<IUser[]> => User.findAll();
  findOne = (email: string): Promise<User | null> => User.findOne({ where: { email } });
  create = (data: NewEntity<IUser>): Promise<IUser> => User.create(data);
}
