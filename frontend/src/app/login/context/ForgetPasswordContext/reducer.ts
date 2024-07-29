import { ForgotPasswordState, ForgotPasswordStateAction, ForgotPasswordStateType } from "./types";
import RequestStatus from "../../../../shared/types/request-status";

const forgotPasswordStateReducer = (state: ForgotPasswordState, action: ForgotPasswordStateAction): ForgotPasswordState => {
  switch (action.type) {
    case ForgotPasswordStateType.REQUEST:
      return {
        ...state,
        requestStatus: action.payload,
        errorMessage: undefined, // Clear any previous error message
      };
    case ForgotPasswordStateType.SUCCESS:
      return {
        ...state,
        requestStatus: action.payload,
        errorMessage: undefined, // Clear any previous error message
      };
    case ForgotPasswordStateType.ERROR:
     
      return {
        ...state,
        requestStatus: new RequestStatus<void>(undefined), // Assuming failure status with no specific payload
        errorMessage: "An error occurred. Please try again.",
      };
    default:
      return state;
  }
};

export default forgotPasswordStateReducer;
