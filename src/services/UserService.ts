import { SequelizeUserModel } from '../models/SequelizeUserModel';
import { NewEntity } from '../types';
import { IUser } from '../types/Users/IUser';
import { IModel } from '../types/Users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../types/ServiceResponse';
import JWT from '../utils/JWT';
import ILogin from '../interfaces/ILogin';

export default class UserService {
  constructor(
    private userModel: IModel<IUser> = new SequelizeUserModel(),
    private jwtService = new JWT(),
  ) { }

  public async getAllUsers(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.userModel.findOne(data);
    if (user) {
      const { role, email } = user as IUser;
      const token = this.jwtService.sign({ email, role });
      return { status: 'SUCCESSFUL', data: { message: token } };
    }
    return { status: 'INVALID_DATA', data: { message: 'User not found' } }
  }

  static validationUser(user: NewEntity<IUser>): string | null {
    if (!user.email) return 'email is required';
    if (!user.password) return 'password is required';
    if (!user.name) return 'name is required';
    return null;
  }
  
  public async createUser(user: NewEntity<IUser>): Promise<ServiceResponse<IUser | ServiceMessage>> {
    const error = UserService.validationUser(user);
    if (error) return { status: 'INVALID_DATA', data: { message: error } };

    const userFound = await this.userModel.findOne({ email: user.email });
    if (userFound) return { status: 'CONFLICT', data: { message: 'User already exists' } };

    const newUser = await this.userModel.create(user);
    return { status: 'SUCCESSFUL', data: newUser };
  }
}
