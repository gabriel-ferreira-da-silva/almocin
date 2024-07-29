import RequestStatus from "../../../../shared/types/request-status";
import { ReactNode } from "react";
import OrderService from "./service";
import { Order } from "../../../../shared/types/order";

export type OrderStateAction =
  | {
      type: OrderStateType.CREATE;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.GET_ALL;
      payload: RequestStatus<Order[]>;
    }
  | {
      type: OrderStateType.UPDATE;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.ADD_TO_CART;
      payload: RequestStatus<string>;
    }
  | {
      type: OrderStateType.GET_BY_USER;
      payload: RequestStatus<Order[]>;
    }
  | {
      type: OrderStateType.GET_DELIVERY_TIME;
      payload: RequestStatus<number>;
    }
  | {
      type: OrderStateType.GET_BY_ID;
      payload: RequestStatus<Order>;
    };

export interface OrderState {
  createOrderRequestStatus: RequestStatus<string>;
  updateOrderRequestStatus: RequestStatus<string>;
  addToCartRequestStatus: RequestStatus<string>;
  getOrdersRequestStatus: RequestStatus<Order[]>;
  getOrderByIdRequestStatus: RequestStatus<Order>;
  getOrdersByUserRequestStatus: RequestStatus<Order[]>;
  getDeliveryTimeRequestStatus: RequestStatus<number>;
}

export enum OrderStateType {
  ADD_TO_CART = "CHANGE_ADD_TO_CART_REQUEST_STATUS",
  CREATE = "CHANGE_CREATE_ORDER_REQUEST_STATUS",
  UPDATE = "CHANGE_UPDATE_ORDER_REQUEST_STATUS",
  GET_ALL = "CHANGE_GET_ORDERS_REQUEST_STATUS",
  GET_BY_ID = "CHANGE_GET_ORDER_BY_ID_REQUEST_STATUS",
  GET_BY_USER = "CHANGE_GET_ORDERS_BY_USER_REQUEST_STATUS",
  GET_DELIVERY_TIME = "CHANGE_GET_DELIVERY_TIME_REQUEST_STATUS",
}

export interface OrderProviderProps {
  children: ReactNode;
}

export interface OrderContextProps {
  state: OrderState;
  prevState?: OrderState;
  service: OrderService;
}
