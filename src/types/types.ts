export interface IUserInfo {
  name: string;
  userName: string;
  email: string;
  readonly role: string;
  readonly phoneNumber: string;
  password: string;
}

export type OmitWithTag<T, K extends keyof T> = Omit<T, K> & {
  [key: string]: unknown;
};

export interface IPassword {
  password: string;
  repeatPassword: string;
  phone: string;
}

export interface IPersonalInfo {
  name: string;
  phoneNumber: string;
  _id: string;
}
