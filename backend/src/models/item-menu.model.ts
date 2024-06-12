import BaseModel from './base.model';

export default class ItemMenuModel extends BaseModel {
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  oldPrice: number;
  available: boolean;
  description: string;
  timeToPrepare: number;

  get hasPromotion(): boolean {
    return this.oldPrice > this.price;
  }

  constructor(data: ItemMenuModel) {
    super(data.id || '');
    this.name = data.name;
    this.price = data.price;
    this.image = data.image;
    this.oldPrice = data.oldPrice;
    this.available = data.available;
    this.createdAt = data.createdAt;
    this.description = data.description;
    this.timeToPrepare = data.timeToPrepare;
  }
}
