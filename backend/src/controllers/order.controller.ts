import { Router, Request, Response } from 'express';
import { Result, SuccessResult, FailureResult } from '../utils/result';
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

    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateOrder(req, res)
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

    console.log("UserID:", userID);

    if(userID){
      const order = await this.orderService.getOrdersByUserId(userID.toString());

      console.log("Orders:", order);

      if (order.length > 0) {
        return new SuccessResult({
          msg: Result.transformRequestOnMsg(req),
          data: order,
        }).handle(res);
      } else {
        return new FailureResult({
          msg:"not found",
        }).handle(res);
      }
    } else {
      res.statusMessage = "not found"
      return new FailureResult({
        msg:"not found",
      }).handle(res);
    }
}


  private async updateOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    const orderData = new OrderEntity({ ...req.body });
    const updatedOrder = await this.orderService.updateOrder(orderId, orderData);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: updatedOrder,
    }).handle(res);
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
