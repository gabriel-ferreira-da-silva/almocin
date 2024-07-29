import RequestStatus from "../../../../shared/types/request-status";
import { ReactNode } from "react";
import ForgotPasswordService from "./service";

// Actions
export type ForgotPasswordStateAction =
  | {
      type: ForgotPasswordStateType.REQUEST;
      payload: RequestStatus<void>;
    }
  | {
      type: ForgotPasswordStateType.SUCCESS;
      payload: RequestStatus<void>;
    }
  | {
      type: ForgotPasswordStateType.ERROR;
      payload: RequestStatus<string>;
    };

// State
export interface ForgotPasswordState {
  requestStatus: RequestStatus<void>;
  errorMessage?: string;
}

// State Action Types
export enum ForgotPasswordStateType {
  REQUEST = "FORGOT_PASSWORD_REQUEST",
  SUCCESS = "FORGOT_PASSWORD_SUCCESS",
  ERROR = "FORGOT_PASSWORD_ERROR",
}

// Provider Props
export interface ForgotPasswordProviderProps {
  children: ReactNode;
}

// Context Props
export interface ForgotPasswordContextProps {
  state: ForgotPasswordState;
  prevState?: ForgotPasswordState;
  service: ForgotPasswordService;
}
