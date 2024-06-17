import OrderModel from '../models/order.model';
import OrderRepository from '../repositories/order.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderEntity from '../entities/order.entity';
import cep from 'cep-promise'; //duvida da API
import axios from 'axios';

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

  public async getOrders(): Promise<OrderModel[]> {
    const entity = await this.orderRepository.getOrders();
    const menu = await this.menuRepository.getItems();
    const model = entity.map((item) => new OrderModel({
      ...item,
      items: menu.filter(el => item.itemsId.includes(el.id)),
    }));
    return model;
  }

  public async createOrder(data: OrderEntity): Promise<OrderModel> {
    const orderEntity = new OrderEntity(data);
    const createdOrder = await this.orderRepository.createOrder(orderEntity);
    const menu = await this.menuRepository.getItems();
    return new OrderModel({
      ...createdOrder,
      items: menu.filter(el => createdOrder.itemsId.includes(el.id)),
    });
  }

  public async updateOrder(orderId: string, data: OrderEntity): Promise<OrderModel | null> {
    const updatedOrder = await this.orderRepository.updateOrder(orderId, data);
    if (!updatedOrder) return null;
    const menu = await this.menuRepository.getItems();
    return new OrderModel({
      ...updatedOrder,
      items: menu.filter(el => updatedOrder.itemsId.includes(el.id)),
    });
  }

  public async calculateDeliveryTime(cepValue: string): Promise<number> {
    const cepResult = await cep(cepValue);

    if (!cepResult || !cepResult.street || !cepResult.neighborhood || !cepResult.city || !cepResult.state) {
      throw new Error('Endereço não encontrado para o CEP fornecido.');
    }

    const address = `${cepResult.street} ${cepResult.neighborhood} ${cepResult.city}, ${cepResult.state}`;

    const googleApiKey = 'AIzaSyDt2t8-Q1LYyEC37XykoWq5pOJohzV4RG4';
    const response = await axios.get('https://maps.googleapis.com/maps/api/distancematrix/json', {
      params: {
        destinations: address,
        origins: 'place_id:${ChIJqzBUEeIbqwcR0x2hkcrMziA}', // PlaceID do CIn
        units: 'metrics',
        key: googleApiKey,
      },
    });

    const distanceMatrixResult = response.data;

    if (distanceMatrixResult.status !== 'OK' || distanceMatrixResult.rows[0].elements[0].status !== 'OK') {
      throw new Error('Não foi possível calcular o tempo de entrega.');
    }

    // Obter a duração em segundos
    const duration = distanceMatrixResult.rows[0].elements[0].duration.value;

    return duration;
  }
}

export default OrderService;
