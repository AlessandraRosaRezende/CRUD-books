import { Identifiable } from "..";

export interface IUser extends Identifiable {
  email: string,
  password: string,
  name: string,
  role?: string
}
