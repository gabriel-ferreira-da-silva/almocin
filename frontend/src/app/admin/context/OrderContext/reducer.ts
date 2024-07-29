import { OrderState, OrderStateAction, OrderStateType } from "./types";

const OrderStateReducer = (state: OrderState, action: OrderStateAction) => {
  switch (action.type) {
    case OrderStateType.CREATE:
      return {
        ...state,
        createOrderRequestStatus: action.payload,
      };
    case OrderStateType.GET_ALL:
      return {
        ...state,
        getOrdersRequestStatus: action.payload,
      };
    case OrderStateType.UPDATE:
      return {
        ...state,
        updateOrderRequestStatus: action.payload,
      };

    default:
      return state;
  }
};

export default OrderStateReducer;
