import { User } from "next-auth";

export interface ISignIn {
  userName: string;
  password: string;
}

export interface ILoader {
  height: number;
  width: number;
  color:string
}

export interface ICredentionals {
  userName: string;
  password: string;
}
export interface CustomUser extends User {
  id: string;
}
