

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
}

export interface IProfilePicProps {
  userInfo: IUserInfo;
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
};

export interface IAccountFound {}
