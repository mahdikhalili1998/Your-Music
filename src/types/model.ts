export interface IUserInfo {
  name: string;
  lastName: string;
  gender: string;
  userName: string;
  email: string;
  savePost: any[];
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
  userLikeId: string[];
  createdAt: Date;
  updatedAt: Date;
}
