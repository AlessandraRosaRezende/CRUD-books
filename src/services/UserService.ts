import { SequelizeUserModel } from '../models/SequelizeUserModel';
import { NewEntity } from '../types';
import { IUser } from '../types/Users/IUser';
import { IModel } from '../types/Users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';

export default class UserService {
  constructor(
    private userModel: IModel<IUser> = new SequelizeUserModel(),
  ) { }

  public async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  // public async createBook(book: NewEntity<IBook>): Promise<ServiceResponse<IBook | ServiceMessage>> {
  //   const error = BookService.validationBook(book);
  //   if (error) return { status: 'INVALID_DATA', data: { message: error } };

  //   const newBook = await this.bookModel.create(book);
  //   return { status: 'SUCCESSFUL', data: newBook };
  // }
}
