import { Dispatch, SetStateAction } from "react";
import { IPassword } from "./types";

export interface IPropsBtLight {
  nextLevel: boolean;
  locale: string;
}

export interface IProfileDetail {
  userData: any;
  openPersonalModal: boolean;
  setIsBlur: Function;
  isBlur: boolean;
  locale: string;
}
export interface IProf {
  userData: any;
  locale: string;
}

export interface IUser {
  user: any;
  locale?: string;
  // profilePicUrl: string;
}

export interface IResetProps {
  otpCode: string;
  changePass: IPassword;
  setChangePass: Function;
}

export interface IDeleteAccount {
  user: any;
  locale: string;
  isSure: boolean;
  setIsSure: Function;
  setFinalDeleting: Function;
  finalDeleting: boolean;
}

export interface ISession {
  user: any;
  locale: string;
}
export interface ISession {
  session: any;
}

export interface IProfilePageProps {
  locale: string;
}

export interface IParams {
  params: {
    locale: string;
  };
}

export interface ILocale {
  locale?: string;
}

export interface IMainPart {
  locale: string;
}

export interface IAudioUploader {
  locale: string;
  setCutAudioUrl: Function;
  cutAudioUrl: string;
}

export interface IShowPost {
  info: any;
  user: any;
  post: any;
  locale: string;
}

export interface IShowPass {
  showPass: boolean;
  setShowPass: Function;
  locale: string;
}

export interface IProfilePost {
  loader: boolean;
  posts: any[];
  noPost: boolean;
  locale: string;
}
export interface IMusicUrl {
  musicUrl: string;
  locale: string;
  date: Date;
  id: string;
}
