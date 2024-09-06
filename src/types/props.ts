import { Dispatch, SetStateAction } from "react";
import { IPassword } from "./types";

export interface IPropsBtLight {
  nextLevel: boolean;
}

export interface IProfileDetail {
  userData: any;
  openPersonalModal: boolean;
  setIsBlur: Function;
  locale: string;
}
export interface IProf {
  userData: any;
  locale: string;
}

export interface IUser {
  user: any;
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
  locale: string;
}
