import UserModel from '../models/UserModel';
import { ILogin, IUser } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { NewEntity } from '../interfaces/ICRUDModel';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async findAll(): Promise<ServiceResponse<IUser[]>> {
    const allUsers = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: allUsers };
  }

  public async findById(id: number): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };

    return { status: 'SUCCESSFUL', data: user };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      const validUser = user.password === data.password;
      if (!validUser) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { message: token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }

  public async createUser(user: NewEntity<IUser>):
  Promise<ServiceResponse<IUser | ServiceMessage>> {
    const userFound = await this.userModel.findByEmail(user.email);
    if (userFound) return { status: 'CONFLICT', data: { message: 'User already exists' } };

    const newUser = await this.userModel.create(user);
    return { status: 'SUCCESSFUL', data: newUser };
  }
}
