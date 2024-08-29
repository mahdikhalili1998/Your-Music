import { Dispatch, SetStateAction } from "react";
import { IPassword } from "./types";

export interface IPropsBtLight {
  nextLevel: boolean;
}

export interface IProfileDetail {
  userData: any;
  openPersonalModal: boolean;
  setIsBlur: Function;
}
export interface IProf {
  userData: any;
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
  email: string;
  isSure: boolean;
  setIsSure: Function;
}

export interface ISession {
  session: any;
}
