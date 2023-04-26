import { Identifiable } from '../ICRUDModel';

export interface ILogin {
  email: string;
  password: string;
}
export interface IUser extends Identifiable, ILogin {
  name: string
}
