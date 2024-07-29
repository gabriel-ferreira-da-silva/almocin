import { Dispatch } from "react";
import { OrderStateAction, OrderStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { OrderFormType } from "../../forms/OrderForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import RequestStatus from "../../../../shared/types/request-status";
import OrderModel from "../../models/OrderModel";

export default class OrderService {
  private apiService: ApiService;
  private dispatch: Dispatch<OrderStateAction>;
  private prefix = "/order";

  constructor({
    apiService,
    dispatch,
  }: {
    apiService: ApiService;
    dispatch: Dispatch<OrderStateAction>;
  }) {
    this.apiService = apiService;
    this.dispatch = dispatch;
  }

  async createOrder(orderForm: OrderFormType): Promise<void> {
    this.dispatch({
      type: OrderStateType.CREATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(this.prefix, orderForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: OrderStateType.CREATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.CREATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async updateOrder(
    id: string,
    OrderForm: OrderFormType
  ): Promise<void> {
    this.dispatch({
      type: OrderStateType.UPDATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`${this.prefix}/${id}`, OrderForm);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: OrderStateType.UPDATE,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.UPDATE,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getOrders(): Promise<void> {
    try {
      this.dispatch({
        type: OrderStateType.GET_ALL,
        payload: RequestStatus.loading(),
      });

      const result = await this.apiService.get(this.prefix);

      result.handle({
        onSuccess: (response) => {
          const responseData = response.data.map(
            (order: OrderModel) => order
          );

          this.dispatch({
            type: OrderStateType.GET_ALL,
            payload: RequestStatus.success(responseData),
          });
        },
        onFailure: (error) => {
          this.dispatch({
            type: OrderStateType.GET_ALL,
            payload: RequestStatus.failure(error),
          });
        },
      });
    } catch (_) {
      this.dispatch({
        type: OrderStateType.GET_ALL,
        payload: RequestStatus.failure(new AppUnknownError()),
      });
    }
  }
}

