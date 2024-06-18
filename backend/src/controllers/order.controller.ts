import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import OrderService from '../services/order.service';
import { OrderStatus } from '../types/order';
import OrderEntity from '../entities/order.entity';

class OrderController {
  private prefix: string = '/order';
  public router: Router;
  private orderService: OrderService;

  constructor(router: Router, orderService: OrderService) {
    this.router = router;
    this.orderService = orderService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getOrders(req, res)
    );

    this.router.get(`${this.prefix}/byUser/:userID`, (req: Request, res: Response) =>
      this.getOrdersByUserId(req, res)
    );

    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createOrder(req, res)
    );
  }

  public async getOrders(req: Request, res: Response) {
    const order = await this.orderService.getOrders();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: order,
    }).handle(res);
  }

  private async getOrdersByUserId(req: Request, res: Response) {
    const userID = req.params.userID || req.query.userID;

    if(userID){
      const order = await this.orderService.getOrdersByUserId(userID.toString());
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: order,
      }).handle(res);
    }
  }

  private async createOrder(req: Request, res: Response) {
    const orderData =  new OrderEntity({...req.body, status: OrderStatus.inCart});
    const newOrder = await this.orderService.createOrder(orderData);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: newOrder,
    }).handle(res);
  }

}

export default OrderController;
