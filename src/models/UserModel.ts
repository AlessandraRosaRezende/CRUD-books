import User from '../database/models/User';
import { INewUser, IUser } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';

export default class UserModel implements IUserModel {
  findAll = (): Promise<IUser[]> => User.findAll();
  findOne = (email: string): Promise<User | null> => User.findOne({ where: { email } });
  create = (data: INewUser): Promise<IUser> => User.create(data);
}
