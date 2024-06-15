import BaseEntity from "./base.entity";

export default class PedidoEntity extends BaseEntity {
  name: string;
  items: string[];
  userID: string;
  totalPrice: number;
  pedidoId: string;
  description: string;
  status:string;
  totalPrepareTime: number;
  totalDeliveryTime: number;

  constructor(data: PedidoEntity) {
    super(data.id || '');
    this.name = data.name;
    this.status = data.status;
    this.userID = data.userID;
    this.totalPrice = data.totalPrice;
    this.description = data.description;
    this.totalPrepareTime = data.totalPrepareTime;
    this.totalDeliveryTime = data.totalDeliveryTime;
  }
}