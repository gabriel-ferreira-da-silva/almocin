import { createContext, useReducer, useMemo, ReactNode } from "react";
import { StatsContextProps } from "./types";
import { statsReducer } from "./reducer";
import RequestStatus from "../../../../shared/types/request-status";
import { ApiService } from "../../../../shared/services/ApiService";
import StatsService from "./service";

const StatsContext = createContext<StatsContextProps>(
  {} as StatsContextProps
);

const StatsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(statsReducer, {
    getStatsRequestStatus: RequestStatus.idle(),
  });

  const apiService = useMemo(() => {
    return new ApiService({});
  }, []);
  const service = useMemo(
    () =>
      new StatsService({
        apiService,
        dispatch,
      }),
    [apiService]
  );

  return (
    <StatsContext.Provider value={{
        state,
        service
    }}>
      {children}
    </StatsContext.Provider>
  )
};

export { StatsContext, StatsProvider };
