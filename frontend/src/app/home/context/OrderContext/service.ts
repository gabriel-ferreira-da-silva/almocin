import { Dispatch } from "react";
import { OrderStateAction, OrderStateType } from "./types";
import { ApiService } from "../../../../shared/services/ApiService";
import { OrderFormType } from "../../models/OrderForm";
import { AppUnknownError } from "../../../../shared/errors/app-error";
import RequestStatus from "../../../../shared/types/request-status";
import { Order } from "../../../../shared/types/order";

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

  async addOrderToCart(id: string, userId: string): Promise<void> {
    this.dispatch({
      type: OrderStateType.ADD_TO_CART,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.post(`${this.prefix}/add`, {
      id,
      userId,
    });

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: OrderStateType.ADD_TO_CART,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.ADD_TO_CART,
          payload: RequestStatus.failure(error),
        });
      },
    });
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
    OrderData: Order
  ): Promise<void> {
    this.dispatch({
      type: OrderStateType.UPDATE,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.update(`${this.prefix}/${id}`, OrderData);

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
          const responseData: Order[] = response.data.map(
            (order: Order) => order
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

  async getOrdersByUserId(userId: string): Promise<void> {
    this.dispatch({
      type: OrderStateType.GET_BY_USER,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/byUser/${userId}`);

    result.handle({
      onSuccess: (response) => {
        const responseData: Order[] = response.data.map(
          (order: Order) => order
        );

        this.dispatch({
          type: OrderStateType.GET_BY_USER,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.GET_BY_USER,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getDeliveryTime(id: string, cep: string): Promise<void> {
    this.dispatch({
      type: OrderStateType.GET_DELIVERY_TIME,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}/${cep}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: OrderStateType.GET_DELIVERY_TIME,
          payload: RequestStatus.success(responseData.totalDeliveryTime),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.GET_DELIVERY_TIME,
          payload: RequestStatus.failure(error),
        });
      },
    });
  }

  async getOrderById(id: string): Promise<void> {
    this.dispatch({
      type: OrderStateType.GET_BY_ID,
      payload: RequestStatus.loading(),
    });

    const result = await this.apiService.get(`${this.prefix}/${id}`);

    result.handle({
      onSuccess: (response) => {
        const responseData = response.data;
        this.dispatch({
          type: OrderStateType.GET_BY_ID,
          payload: RequestStatus.success(responseData),
        });
      },
      onFailure: (error) => {
        this.dispatch({
          type: OrderStateType.GET_BY_ID,
          payload: RequestStatus.failure(error),
        });
      }
    });
  }
}

