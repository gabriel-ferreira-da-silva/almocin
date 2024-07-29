import RequestStatus from "../../../../shared/types/request-status";
import { LoginResponse } from "../../models/LoginModel";
import { ReactNode } from "react";
import LoginService from "./service";

export type LoginStateAction =
  | {
      type: LoginStateType.LOGIN;
      payload: RequestStatus<LoginResponse>;
    }
  | {
      type: LoginStateType.LOGOUT;
      payload: RequestStatus<void>;
    };

export interface LoginState {
  loginRequestStatus: RequestStatus<LoginResponse>;
  logoutRequestStatus: RequestStatus<void>;
}

export enum LoginStateType {
  LOGIN = "CHANGE_LOGIN_REQUEST_STATUS",
  LOGOUT = "CHANGE_LOGOUT_REQUEST_STATUS",
}

export interface LoginProviderProps {
  children: ReactNode;
}

export interface LoginContextProps {
  state: LoginState;
  prevState?: LoginState;
  service: LoginService;
}
