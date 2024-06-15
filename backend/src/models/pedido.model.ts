import PedidoEntity from '../entities/pedido.entity';
import CategoryEntity from '../entities/category.entity';
import ItemMenuEntity from "../entities/item-menu.entity";
import BaseModel from './base.model';

export default class PedidoModel extends BaseModel {
  name: string;
  items: ItemMenuEntity[];
  userID: string;
  totalPrice: number;
  description: string;
  status:string;
  totalPrepareTime: number;
  totalDeliveryTime: number;

  constructor(data: PedidoModel) {
    super(data.id || '');
    this.name = data.name;
    this.status = data.status;
    this.userID = data.userID;
    this.totalPrice = data.totalPrice;
    this.description = data.description;
    this.totalDeliveryTime = data.totalDeliveryTime;
    this.totalPrepareTime = data.totalPrepareTime;
  }
}
