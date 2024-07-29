import { createContext, useReducer, useMemo } from "react";
import CategoryService from "./service";
import categoryStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { CategoryContextProps, CategoryProviderProps } from "./types";

export const CategoryContext = createContext<CategoryContextProps>(
  {} as CategoryContextProps
);

export const CategoryProvider = ({ children }: CategoryProviderProps) => {
  const [state, dispatch] = useReducer(categoryStateReducer, {
    createCategoryRequestStatus: RequestStatus.idle(),
    updateCategoryRequestStatus: RequestStatus.idle(),
    deleteCategoryRequestStatus: RequestStatus.idle(),
    getCategoryRequestStatus: RequestStatus.idle(),
    getCategoriesRequestStatus: RequestStatus.idle(),
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new CategoryService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <CategoryContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
