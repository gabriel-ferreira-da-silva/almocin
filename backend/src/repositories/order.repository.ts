import OrderEntity from '../entities/order.entity';
import BaseRepository from './base.repository';

class OrderRepository extends BaseRepository<OrderEntity> {
  constructor() {
    super('order');
  }

  public async getOrders(): Promise<OrderEntity[]> {
    return await this.findAll();
  }

  public async getOrdersByUserId(userId:string): Promise<OrderEntity[]> {
    return await this.findAll(((order)=> order.userID === userId));
  }

  public async getOrder(id: string): Promise<OrderEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createOrder(data: OrderEntity): Promise<OrderEntity> {
    return await this.add(data);
  }

  public async updateOrder(
    id: string,
    data: OrderEntity
  ): Promise<OrderEntity | null> {
    return await this.update((Order) => Order.id === id, data);
  }

  public async deleteOrder(id: string): Promise<void> {
    await this.delete((Order) => Order.id !== id);
  }
}

export default OrderRepository;
