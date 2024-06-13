import BaseEntity from './base.entity';

export default class ItemMenuEntity extends BaseEntity {
  name: string;
  price: number;
  image: string;
  categoryID: string;
  oldPrice: number;
  description: string;
  timeToPrepare: number;

  constructor(data: ItemMenuEntity) {
    super(data.id || '');
    this.name = data.name;
    this.image = data.image;
    this.price = data.price;
    this.categoryID = data.categoryID;
    this.oldPrice = data.oldPrice;
    this.description = data.description;
    this.timeToPrepare = data.timeToPrepare;
  }
}
