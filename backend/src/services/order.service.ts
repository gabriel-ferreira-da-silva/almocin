import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderEntity from '../entities/order.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { OrderStatus } from '../types/order';

class OrderService {
  private orderRepository: OrderRepository;
  private menuRepository: MenuRepository;

  constructor(
    orderRepository: OrderRepository,
    menuRepository: MenuRepository,
  ) {
    this.orderRepository = orderRepository;
    this.menuRepository = menuRepository;
  }

  public async addOrder(id: string, userId: string) {
    const ordersByUser = await this.orderRepository.getOrdersByUserId(userId);
    const orderInCart = ordersByUser.find(order => order.status === OrderStatus.inCart);
    const item = await this.menuRepository.getItem(id);

    if (orderInCart) {
      orderInCart.itemsId.push(id);
      orderInCart.totalPrice += item!.price;
      return await this.updateOrder(orderInCart.id, orderInCart);
    } else {
      const order = new OrderEntity({
        totalPrice: item!.price,
        itemsId: [id],
        userID: userId,
        status: OrderStatus.inCart,
      } as OrderEntity);
      return await this.orderRepository.createOrder(order);
    }
  }

  public async getOrders(): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();
    const menu = await this.menuRepository.getItems();

    const model = entity.map((item) => new OrderModel({
      ...item,
      itemsId: menu.filter(el => item.itemsId.includes(el.id)).map(el => el.id),
      items: menu.filter(el => item.itemsId.includes(el.id)),
      totalPrice: menu.filter(el => item.itemsId.includes(el.id)).reduce(
        (acc, el) => acc + el.price, 0
      ),
    }));
    return model;
  }
  public async getOrdersByUserId(userId: string): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();
    const menu = await this.menuRepository.getItems();

    const model = entity
      .filter(order => order.userID === userId)
      .map((item) => new OrderModel({
        ...item,
        itemsId: menu.filter(el => item.itemsId.includes(el.id)).map(el => el.id),
        items: menu.filter(el => item.itemsId.includes(el.id)),
        totalPrice: menu.filter(el => item.itemsId.includes(el.id)).reduce(
          (acc, el) => acc + el.price, 0
        ),
      }));

    return model;
  }

  public async getOrder(id: string): Promise<OrderModel> {
    const entity = await this.orderRepository.getOrder(id);
    if (entity) {
      const allItems = await this.menuRepository.getItems();
      return new OrderModel({
        ...entity,
        items: allItems.filter(item => entity.itemsId.includes(item.id)),
      });
    } else {
      throw new HttpNotFoundError({
        msgCode: 'Não encontrado',
        msg: 'Pedido não encontrado no cardápio',
      });
    }
  }

  public async createOrder(data: OrderEntity): Promise<OrderModel> {
    const intemsId = data.itemsId;
    const orderEntity = new OrderEntity(data);
    const createdOrder = await this.orderRepository.createOrder(orderEntity);
    const allItems = await this.menuRepository.getItems();
    return new OrderModel({
      ...createdOrder,
      itemsId: intemsId,
      status: OrderStatus.inCart,
      items: allItems.filter(item => intemsId.includes(item.id)),
    });
  }

  public async updateOrder(id: string, data: OrderEntity): Promise<OrderModel> {
    const previousOrder = await this.orderRepository.getOrder(id);
    if (!previousOrder) {
      throw new HttpNotFoundError({
        msgCode: 'Não encontrado',
        msg: 'Pedido não encontrado no cardápio',
      });
    }

    const newData: OrderEntity = new OrderEntity({
      ...previousOrder,
      itemsId: data?.itemsId ?? previousOrder.itemsId,
      userID: data?.userID ?? previousOrder.userID,
      totalPrice: data?.totalPrice ?? previousOrder.totalPrice,
      status: data?.status ?? previousOrder.status,
      totalDeliveryTime: data?.totalDeliveryTime ?? previousOrder.totalDeliveryTime,
      cep: data?.cep ?? previousOrder.cep,
      address_number: data?.address_number ?? previousOrder.address_number,
    });

    const entity = await this.orderRepository.updateOrder(id, newData);

    if (entity) {
      const allItems = await this.menuRepository.getItems();
      return new OrderModel({
        ...entity,
        items: allItems.filter(item => entity.itemsId.includes(item.id)),
      });
    } else {
      throw new Error('Order entity is null.');
    }
  }

  public async calculateDeliveryTime(cepValue: string): Promise<number> {
    const cepNumber = parseInt(cepValue.split('-')[1]) + 1;
    const duration = Math.ceil(Math.random() * (cepNumber % 70) + 1);

    return duration;
  }
}

export default OrderService;
