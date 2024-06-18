import ItemMenuEntity from '../entities/item-menu.entity';
import { OrderStatus } from '../types/order';
import BaseModel from './base.model';

export default class OrderModel extends BaseModel {
  items: ItemMenuEntity[];
  userID: string;
  totalPrice: number;
  status: OrderStatus;
  totalDeliveryTime: number;
  cep: string;
  address_number: number;

  constructor(data: OrderModel) {
    super(data.id || '');
    this.items = data.items;
    this.userID = data.userID;
    this.totalPrice = data.totalPrice;
    this.status = data.status;
    this.totalDeliveryTime = data.totalDeliveryTime;
    this.cep = data.cep;
    this.address_number = data.address_number;
  }
}
