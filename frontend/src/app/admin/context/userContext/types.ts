import RequestStatus from "../../../../shared/types/request-status";
import UserModel from "../../models/UserModel";
import { ReactNode } from "react";
import UserService from "./service";

export type UserStateAction =
  | {
      type: UserStateType.CREATE;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: UserStateType.GET_ALL;
      payload: RequestStatus<UserModel[]>;
    }
  | {
      type: UserStateType.GET;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: UserStateType.UPDATE;
      payload: RequestStatus<UserModel>;
    }
  | {
      type: UserStateType.DELETE;
      payload: RequestStatus<string>;
    };

export interface UserState {
  createUserRequestStatus: RequestStatus<UserModel>;
  updateUserRequestStatus: RequestStatus<UserModel>;
  deleteUserRequestStatus: RequestStatus<string>;
  getUserRequestStatus: RequestStatus<UserModel>;  
  getUsersRequestStatus: RequestStatus<UserModel[]>;
}

export enum UserStateType {
  GET = "CHANGE_GET_USER_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_USERS_REQUEST_STATUS",
  CREATE = "CHANGE_CREATE_USER_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_USER_REQUEST_STATUS",
  DELETE = "CHANGE_DELETE_USER_REQUEST_STATUS",
}

export interface UserProviderProps {
  children: ReactNode;
}

export interface UserContextProps {
  state: UserState;
  prevState?: UserState;
  service: UserService;
}