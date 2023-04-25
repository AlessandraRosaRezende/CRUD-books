import UserModel from '../models/UserModel';
import { NewEntity } from '../interfaces';
import { IUser } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import ILogin from '../interfaces/users/ILogin';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = new JWT(),
  ) { }

  public async findAll(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'successful', data: allUsers };
  }

  public async findOne(email: string): Promise<ServiceResponse<IUser | null>> {
    const user = await this.userModel.findOne(email);
    return { status: 'successful', data: user };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.userModel.findOne(data.email);
    if (user) {
      const validUser = user.password === data.password;
      if (!validUser) {
        return { status: 'invalidData', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'successful', data: { message: token } };
    }
    return { status: 'notFound', data: { message: 'User not found' } };
  }

  static validationUser(user: NewEntity<IUser>): string | null {
    if (!user.email) return 'email is required';
    if (!user.password) return 'password is required';
    if (!user.name) return 'name is required';
    return null;
  }

  public async createUser(user: NewEntity<IUser>):
  Promise<ServiceResponse<IUser | ServiceMessage>> {
    const error = UserService.validationUser(user);
    if (error) return { status: 'invalidData', data: { message: error } };

    const userFound = await this.userModel.findOne(user.email);
    if (userFound) return { status: 'conflict', data: { message: 'User already exists' } };

    const newUser = await this.userModel.create(user);
    return { status: 'successful', data: newUser };
  }
}
