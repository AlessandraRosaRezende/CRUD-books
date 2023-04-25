import User from '../database/models/User';
import ILogin from '../interfaces/ILogin';
import { NewEntity } from '../types';
import { IUser } from '../types/users/IUser';
import { IModel } from '../types/users/IUserModel';

export class SequelizeUserModel implements IModel<IUser> {
  findAll = (): Promise<IUser[]> => User.findAll()
  findOne = (data: ILogin): Promise<User | null> => User.findOne({
    where: {
      email: data.email
    }
  })
  create = (data: NewEntity<IUser>): Promise<IUser> => User.create(data)
}
