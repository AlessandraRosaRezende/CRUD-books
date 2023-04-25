export interface IUser {
  id: number,
  email: string,
  password: string,
  name: string
}

export type INewUser = Omit<IUser, 'id'>;
