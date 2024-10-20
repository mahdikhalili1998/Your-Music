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
  lastName: string;
  phoneNumber: string;
  _id: string;
  bio: string;
}

export interface IProfilePicProps {
  userInfo: UserInfo;
  setUserInfo: Function;
  image: File;
  setImage: Function;
  isEditing: boolean;
  setIsEditing: Function;
  locale: string;
}

export interface IImgProfile {
  men: string;
  women: string;
  other: string;
  user: string;
}

export interface ISignupPage {
  image: File;
  setImage: Function;
  isEditing: boolean;
  locale?: string;
  setIsEditing: Function;
}

export type UserInfo = {
  userName: string;
  profilePicUrl: string;
  locale?: string;
  creditCardNumber: string;
  gender: string;
  password: string;
  role: string;
  phoneNumber: string;
  email: string;
  name: string;
  lastName: string;
  bio: string;
};
export interface IUserFound {
  profilePicUrl: string;
  userName: string;
  locale: string;
}
export interface IUser {
  profilePicUrl: string;
  userName: string;
}

export interface ILike_cm {
  like: boolean;
  comment: string;
}
