import { createContext, useReducer, useMemo } from "react";
import MenuService from "./service";
import menuStateReducer from "./reducer";
import { ApiService } from "../../services/ApiService";
import RequestStatus from "../../types/request-status";
import usePrevious from "../../hooks/usePrevious";
import { MenuContextProps, MenuProviderProps } from "./types";

export const MenuContext = createContext<MenuContextProps>(
  {} as MenuContextProps
);

export const MenuProvider = ({ children }: MenuProviderProps) => {
  const [state, dispatch] = useReducer(menuStateReducer, {
    createItemRequestStatus: RequestStatus.idle(),
    updateItemRequestStatus: RequestStatus.idle(),
    deleteItemRequestStatus: RequestStatus.idle(),
    getItemRequestStatus: RequestStatus.idle(),
    getItemsRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new MenuService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <MenuContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};
