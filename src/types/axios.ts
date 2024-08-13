import { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IAxios extends AxiosRequestConfig {
  phoneNumber: string;
  userId: string;
}

export interface IAxiosResponse extends AxiosResponse {
  response: any;
}
