import { StatsState, StatsStateAction } from "./types";

export const statsReducer = (state: StatsState, action: StatsStateAction): StatsState => {
  return {
    ...state,
    getStatsRequestStatus: action.payload
  }
}
