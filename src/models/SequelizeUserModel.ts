import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import { NewEntity } from '../types';
import { IUser } from '../types/Users/IUser';
import { IModel } from '../types/Users/IUserModel';

export class SequelizeUserModel implements IModel<IUser> {
  findAll = (): Promise<IUser[]> => User.findAll()
  findOne = (data: ILogin): Promise<User | null> => User.findOne({
    where: {
      email: data.email,
      password: data.password
    }
  })
  create = (data: NewEntity<IUser>): Promise<IUser> => User.create(data)
}
