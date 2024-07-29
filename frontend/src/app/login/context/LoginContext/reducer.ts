import { LoginState, LoginStateAction, LoginStateType } from "./types";

const loginStateReducer = (state: LoginState, action: LoginStateAction): LoginState => {
  switch (action.type) {
    case LoginStateType.LOGIN:
      return {
        ...state,
        loginRequestStatus: action.payload,
      };
    case LoginStateType.LOGOUT:
      return {
        ...state,
        logoutRequestStatus: action.payload,
      };
    default:
      return state;
  }
};

export default loginStateReducer;
