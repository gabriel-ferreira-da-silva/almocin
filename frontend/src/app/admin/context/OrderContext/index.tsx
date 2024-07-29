import { createContext, useReducer, useMemo } from "react";
import OrderService from "./service";
import OrderStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { OrderContextProps, OrderProviderProps } from "./types";

export const OrderContext = createContext<OrderContextProps>(
  {} as OrderContextProps
);

export const OrderProvider = ({ children }: OrderProviderProps) => {
  const [state, dispatch] = useReducer(OrderStateReducer, {
    createOrderRequestStatus: RequestStatus.idle(),
    updateOrderRequestStatus: RequestStatus.idle(),
    getOrdersRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new OrderService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <OrderContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
