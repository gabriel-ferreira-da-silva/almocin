import { ReactNode } from "react";
import RequestStatus from "../../../../shared/types/request-status";
import { StatsModel } from "../../models/StatsModel";
import StatsService from "./service";

export type StatsStateAction = {
  type: StatsStateType.GET_STATS;
  payload: RequestStatus<StatsModel>;
}

export interface StatsState {
  getStatsRequestStatus: RequestStatus<StatsModel>;  
}

export enum StatsStateType {
  GET_MONTH = "GET_STATS_MONTH_REQUEST",
  GET_MONEY = "GET_STATS_MONEY_REQUEST",
  GET_STATS = "GET_STATS_REQUEST",
}

export interface StatsProviderProps {
  children: ReactNode;
}

export interface StatsContextProps {
  state: StatsState;
  prevState?: StatsState;
  service: StatsService;
}

