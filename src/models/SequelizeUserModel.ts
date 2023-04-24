import User from '../database/models/User';
import { NewEntity } from '../types';
import { IUser } from '../types/Users/IUser';
import { IModel } from '../types/Users/IUserModel';

export class SequelizeUserModel implements IModel<IUser> {
  findAll = (): Promise<IUser[]> => User.findAll()

  // create = (data: NewEntity<IBook>): Promise<IBook> => Book.create(data)
}
