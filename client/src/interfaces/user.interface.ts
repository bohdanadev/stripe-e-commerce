export interface IUser {
  id: string;
  [key: string]: any;
}

export interface IAuth {
  name?: string;
  email?: string;
  address?: string;
  firstname?: string;
  password?: string;
}

export type FormValues = Pick<IAuth, 'email' | 'password'>;
