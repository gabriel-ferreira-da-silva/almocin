import { Dispatch } from "react";
import { CategoryStateAction, CategoryStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { CategoryFormType } from "../../forms/CategoryForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import RequestStatus from "../../../../shared/types/request-status";
import CategoryModel from "../../models/CategoryModel";

export default class CategoryService {
  private apiService: ApiService;
  private dispatch: Dispatch<CategoryStateAction>;
  private prefix = "/category";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<CategoryStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createCategory(categoryForm: CategoryFormType): Promise<void> {
    this.dispatch({
      type: CategoryStateType.CREATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(this.prefix, categoryForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: CategoryStateType.CREATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: CategoryStateType.CREATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getCategory(id: string): Promise<void> {
    this.dispatch({
      type: CategoryStateType.GET,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: CategoryStateType.GET,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: CategoryStateType.GET,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async deleteCategory(id: string): Promise<void> {
    this.dispatch({
      type: CategoryStateType.DELETE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.delete(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: CategoryStateType.DELETE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: CategoryStateType.DELETE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async updateCategory(
    id: string,
    categoryForm: CategoryFormType
  ): Promise<void> {
    this.dispatch({
      type: CategoryStateType.UPDATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`${this.prefix}/${id}`, categoryForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: CategoryStateType.UPDATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: CategoryStateType.UPDATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getCategories(): Promise<void> {
    try {
      this.dispatch({
        type: CategoryStateType.GET_ALL,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(this.prefix);

      result.handle({
        onSuccess: (response) => {
          const responseData = response.data.map(
            (category: CategoryModel) => category
          );

          this.dispatch({
            type: CategoryStateType.GET_ALL,
            payload: RequestStatus.success(responseData),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: CategoryStateType.GET_ALL,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: CategoryStateType.GET_ALL,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}

