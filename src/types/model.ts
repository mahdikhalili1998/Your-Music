export interface IUserInfo {
  name: string;
  lastName: string;
  gender: string;
  userName: string;
  email: string;
  readonly role: string;
  readonly phoneNumber: string;
  password: string;
  profilePicUrl: string;
  creditCardNumber: string;
}

export interface IUserPostModel {
  userId: any;
  musicUrl: string;
  description: string;
}
