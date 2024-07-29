import { Dispatch } from "react";
import { ApiService } from "../../../../shared/services/ApiService";
import { StatsStateAction, StatsStateType } from "./types";
import RequestStatus from "../../../../shared/types/request-status";
export default class StatsService {
  private apiService: ApiService;
  private dispatch: Dispatch<StatsStateAction>;
  private prefix = "/stats";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<StatsStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async getStats(type?: StatsStateType): Promise<void> {
    this.dispatch({
      type: StatsStateType.GET_STATS,
      payload: RequestStatus.loading(),
    });

    let urlSuffix = `all`;
    if (type === StatsStateType.GET_MONTH) {
      urlSuffix = `month`;
    } else if (type === StatsStateType.GET_MONEY) {
      urlSuffix = `money`;
    }
    const result = await this.apiService.get(`${this.prefix}/${urlSuffix}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: StatsStateType.GET_STATS,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: StatsStateType.GET_STATS,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
