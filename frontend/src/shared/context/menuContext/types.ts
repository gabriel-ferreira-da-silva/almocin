import RequestStatus from "../../types/request-status";
import ItemMenuModel from "../../../app/admin/models/ItemMenuModel";
import { ReactNode } from "react";
import MenuService from "./service";

export type MenuStateAction =
  | {
      type: MenuStateType.CREATE;
      payload: RequestStatus<ItemMenuModel>;
    }
  | {
      type: MenuStateType.GET_ALL;
      payload: RequestStatus<ItemMenuModel[]>;
    }
  | {
      type: MenuStateType.GET;
      payload: RequestStatus<ItemMenuModel>;
    }
  | {
      type: MenuStateType.UPDATE;
      payload: RequestStatus<ItemMenuModel>;
    }
  | {
      type: MenuStateType.DELETE;
      payload: RequestStatus<string>;
    };

export interface MenuState {
  createItemRequestStatus: RequestStatus<ItemMenuModel>;
  updateItemRequestStatus: RequestStatus<ItemMenuModel>;
  deleteItemRequestStatus: RequestStatus<string>;
  getItemRequestStatus: RequestStatus<ItemMenuModel>;  
  getItemsRequestStatus: RequestStatus<ItemMenuModel[]>;
}

export enum MenuStateType {
  CREATE = "CHANGE_CREATE_ITEM_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_ITEM_REQUEST_STATUS",
  DELETE = "CHANGE_DELETE_ITEM_REQUEST_STATUS",
  GET = "CHANGE_GET_ITEM_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_ITEMS_REQUEST_STATUS",
}

export interface MenuProviderProps {
  children: ReactNode;
}

export interface MenuContextProps {
  state: MenuState;
  prevState?: MenuState;
  service: MenuService;
}

