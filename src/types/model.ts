export interface IUserInfo {
  name: string;
  lastName: string;
  gender: string;
  userName: string;
  email: string;
  bio?: string;
  readonly role: string;
  readonly phoneNumber: string;
  password: string;
  profilePicUrl: string;
  creditCardNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserPostModel {
  userId: any;
  musicUrl: string;
  description: string;
  userName: string;
  profilePicUrl: string;
  likeCount: number;
  likeSituation: boolean;
  createdAt: Date;
  updatedAt: Date;
}
