import { UserState, UserStateAction, UserStateType } from "./types";

const userStateReducer = (state: UserState, action: UserStateAction) => {
  switch (action.type) {
    case UserStateType.CREATE:
      return {
        ...state,
        createUserRequestStatus: action.payload,
      };
    case UserStateType.GET:
      return {
        ...state,
        getUserRequestStatus: action.payload,
      };
    case UserStateType.GET_ALL:
      return {
        ...state,
        getUsersRequestStatus: action.payload,
      };
    case UserStateType.UPDATE:
      return {
        ...state,
        updateUserRequestStatus: action.payload,
      };
    case UserStateType.DELETE:
      return {
        ...state,
        deleteUserRequestStatus: action.payload
      };

    default:
      return state;
  }
};

export default userStateReducer;