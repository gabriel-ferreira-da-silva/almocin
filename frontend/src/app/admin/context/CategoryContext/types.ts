import RequestStatus from "../../../../shared/types/request-status";
import CategoryModel from "../../models/CategoryModel";
import { ReactNode } from "react";
import CategoryService from "./service";

export type CategoryStateAction =
  | {
      type: CategoryStateType.CREATE;
      payload: RequestStatus<string>;
    }
  | {
      type: CategoryStateType.GET_ALL;
      payload: RequestStatus<CategoryModel[]>;
    }
  | {
      type: CategoryStateType.GET;
      payload: RequestStatus<CategoryModel>;
    }
  | {
      type: CategoryStateType.UPDATE;
      payload: RequestStatus<string>;
    }
  | {
      type: CategoryStateType.DELETE;
      payload: RequestStatus<string>;
    };

export interface CategoryState {
  createCategoryRequestStatus: RequestStatus<string>;
  updateCategoryRequestStatus: RequestStatus<string>;
  deleteCategoryRequestStatus: RequestStatus<string>;
  getCategoryRequestStatus: RequestStatus<CategoryModel>;  
  getCategoriesRequestStatus: RequestStatus<CategoryModel[]>;
}

export enum CategoryStateType {
  CREATE = "CHANGE_CREATE_CATEGORY_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_CATEGORY_REQUEST_STATUS",
  DELETE = "CHANGE_DELETE_CATEGORY_REQUEST_STATUS",
  GET = "CHANGE_GET_CATEGORY_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_CATEGORIES_REQUEST_STATUS",
}

export interface CategoryProviderProps {
  children: ReactNode;
}

export interface CategoryContextProps {
  state: CategoryState;
  prevState?: CategoryState;
  service: CategoryService;
}
