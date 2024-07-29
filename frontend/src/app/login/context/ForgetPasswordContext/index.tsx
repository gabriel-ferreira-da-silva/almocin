import { createContext, useReducer, useMemo } from "react";
import ForgotPasswordService from "./service";
import forgotPasswordStateReducer from "./reducer";
import { ApiService } from "../../../../shared/services/ApiService";
import RequestStatus from "../../../../shared/types/request-status";
import usePrevious from "../../../../shared/hooks/usePrevious";
import { ForgotPasswordContextProps, ForgotPasswordProviderProps } from "./types";

export const ForgotPasswordContext = createContext<ForgotPasswordContextProps>(
  {} as ForgotPasswordContextProps
);

export const ForgotPasswordProvider = ({ children }: ForgotPasswordProviderProps) => {
  const [state, dispatch] = useReducer(forgotPasswordStateReducer, {
    requestStatus: RequestStatus.idle(),
    errorMessage: undefined,
  });

  const prevState = usePrevious(state);

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  
  const service = useMemo(
    () =>
      new ForgotPasswordService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <ForgotPasswordContext.Provider
      value={{
        state,
        prevState,
        service,
      }}
    >
      {children}
    </ForgotPasswordContext.Provider>
  );
};
