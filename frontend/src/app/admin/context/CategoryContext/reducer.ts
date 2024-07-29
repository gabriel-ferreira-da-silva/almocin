import { CategoryState, CategoryStateAction, CategoryStateType } from "./types";

const categoryStateReducer = (state: CategoryState, action: CategoryStateAction) => {
  switch (action.type) {
    case CategoryStateType.CREATE:
      return {
        ...state,
        createCategoryRequestStatus: action.payload,
      };
    case CategoryStateType.GET:
      return {
        ...state,
        getCategoryRequestStatus: action.payload,
      };
    case CategoryStateType.GET_ALL:
      return {
        ...state,
        getCategoriesRequestStatus: action.payload,
      };
    case CategoryStateType.UPDATE:
      return {
        ...state,
        updateCategoryRequestStatus: action.payload,
      };
    case CategoryStateType.DELETE:
      return {
        ...state,
        deleteCategoryRequestStatus: action.payload
      };

    default:
      return state;
  }
};

export default categoryStateReducer;
