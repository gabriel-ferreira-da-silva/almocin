import { Dispatch } from "react";
import { LoginStateAction, LoginStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { LoginFormType } from "../../forms/LoginForm";
import RequestStatus from "../../../../shared/types/request-status";

export default class LoginService {
  private apiService: ApiService;
  private dispatch: Dispatch<LoginStateAction>;
  private prefix = "/login";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<LoginStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async login(credentials: LoginFormType): Promise<void> {
    this.dispatch({
      type: LoginStateType.LOGIN,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(this.prefix, credentials);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: LoginStateType.LOGIN,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateType.LOGIN,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async logout(): Promise<void> {
    this.dispatch({
      type: LoginStateType.LOGOUT,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(`${this.prefix}/logout`, {});

    result.handle({
      onSuccess: (response) => {
        this.dispatch({
          type: LoginStateType.LOGOUT,
          payload: RequestStatus.success(response.data),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: LoginStateType.LOGOUT,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }
}
