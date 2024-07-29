import { Dispatch } from "react";
import { MenuStateAction, MenuStateType } from "./types";
import { ApiService } from "../../services/ApiService";
import { MenuFormType } from "../../../app/admin/forms/MenuForm";
import { AppUnknownError } from "../../errors/app-error";
import RequestStatus from "../../types/request-status";
import ItemMenuModel from "../../../app/admin/models/ItemMenuModel";

export default class MenuService {
  private apiService: ApiService;
  private dispatch: Dispatch<MenuStateAction>;
  private prefix = "/menu";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<MenuStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createItem(itemMenuForm: MenuFormType): Promise<void> {
    this.dispatch({
      type: MenuStateType.CREATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(this.prefix, itemMenuForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: MenuStateType.CREATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: MenuStateType.CREATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getItem(id: string): Promise<void> {
    this.dispatch({
      type: MenuStateType.GET,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: MenuStateType.GET,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: MenuStateType.GET,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async deleteItem(id: string): Promise<void> {
    this.dispatch({
      type: MenuStateType.DELETE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseMsg = response.msg;
        this.dispatch({
          type: MenuStateType.DELETE,
          payload: RequestStatus.success(responseMsg),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: MenuStateType.DELETE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async updateItem(
    id: string,
    itemMenuForm: MenuFormType
  ): Promise<void> {
    this.dispatch({
      type: MenuStateType.UPDATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`${this.prefix}/${id}`, itemMenuForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: MenuStateType.UPDATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: MenuStateType.UPDATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getItems(): Promise<void> {
    try {
      this.dispatch({
        type: MenuStateType.GET_ALL,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(this.prefix);

      result.handle({
        onSuccess: (response) => {
          const responseData = response.data.map(
            (category: ItemMenuModel) => category
          );

          this.dispatch({
            type: MenuStateType.GET_ALL,
            payload: RequestStatus.success(responseData),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: MenuStateType.GET_ALL,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: MenuStateType.GET_ALL,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}

