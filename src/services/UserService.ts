import * as bcrypt from 'bcrypt';
import UserModel from '../models/UserModel';
import { ILogin, IUser, IUserResponse } from '../interfaces/users/IUser';
import { IUserModel } from '../interfaces/users/IUserModel';
import { ServiceMessage, ServiceResponse } from '../interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { NewEntity } from '../interfaces/ICRUDModel';
import { IToken } from '../interfaces/IToken';

export default class UserService {
  constructor(
    private userModel: IUserModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async findAll(): Promise<ServiceResponse<IUserResponse[]>> {
    const allUsers = await this.userModel.findAll();
    const usersReturn = allUsers.map(({ id, name, email }) => ({ id, name, email }));
    return { status: 'SUCCESSFUL', data: usersReturn };
  }

  public async findById(id: number): Promise<ServiceResponse<IUserResponse>> {
    const user = await this.userModel.findById(id);
    if (!user) return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    const { name, email } = user as IUser;

    return { status: 'SUCCESSFUL', data: { id, name, email } };
  }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findByEmail(data.email);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email } = user as IUser;
      const token = this.jwtService.sign({ email });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'User not found' } };
  }

  public async createUser(user: NewEntity<IUser>):
  Promise<ServiceResponse<IUserResponse | ServiceMessage>> {
    const userFound = await this.userModel.findByEmail(user.email);
    if (userFound) return { status: 'CONFLICT', data: { message: 'User already exists' } };

    const userPassword = bcrypt.hashSync(user.password, 10);
    const newUser = await this.userModel.create({ ...user, password: userPassword });
    const { id, name, email } = newUser as IUser;

    return { status: 'SUCCESSFUL', data: { id, name, email } };
  }
}
