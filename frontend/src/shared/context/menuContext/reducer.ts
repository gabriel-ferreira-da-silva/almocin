import { MenuState, MenuStateAction, MenuStateType } from "./types";

const menuStateReducer = (state: MenuState, action: MenuStateAction) => {
  switch (action.type) {
    case MenuStateType.CREATE:
      return {
        ...state,
        createItemRequestStatus: action.payload,
      };
    case MenuStateType.GET:
      return {
        ...state,
        getItemRequestStatus: action.payload,
      };
    case MenuStateType.GET_ALL:
      return {
        ...state,
        getItemsRequestStatus: action.payload,
      };
    case MenuStateType.UPDATE:
      return {
        ...state,
        updateItemRequestStatus: action.payload,
      };
    case MenuStateType.DELETE:
      return {
        ...state,
        deleteItemRequestStatus: action.payload
      };

    default:
      return state;
  }
};

export default menuStateReducer;
