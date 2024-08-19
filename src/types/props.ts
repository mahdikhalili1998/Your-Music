import { Dispatch, SetStateAction } from "react";
import { IPassword } from "./types";

export interface IPropsBtLight {
  nextLevel: boolean;
}

export interface IProfileDetail {
  userData: any;
  openPersonalModal: boolean;
}
export interface IProf {
  userData: any;
}

export interface IUser {
  user: any;
}

export interface IResetProps {
  otpCode: string;
  changePass: IPassword;
  setChangePass: Function;
}
