import BaseEntity from './base.entity';

export default class ItemMenuEntity extends BaseEntity {
  name: string;
  price: number;
  image: string;
  createdAt: Date;
  oldPrice: number;
  available: boolean;
  description: string;
  timeToPrepare: number;

  constructor(data: ItemMenuEntity) {
    super(data.id || '');
    this.name = data.name;
    this.image = data.image;
    this.price = data.price;
    this.oldPrice = data.oldPrice;
    this.createdAt = data.createdAt
    this.available = data.available;
    this.description = data.description;
    this.timeToPrepare = data.timeToPrepare;
  }
}
