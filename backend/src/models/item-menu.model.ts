import CategoryEntity from '../entities/category.entity';
import BaseModel from './base.model';

export default class ItemMenuModel extends BaseModel {
  name: string;
  price: number;
  image: string;
  oldPrice: number;
  description: string;
  timeToPrepare: number;
  category: CategoryEntity | null;

  get hasPromotion(): boolean {
    return this.oldPrice > this.price;
  }

  constructor(data: ItemMenuModel) {
    super(data.id || '');
    this.name = data.name;
    this.price = data.price;
    this.image = data.image;
    this.category = data.category;
    this.oldPrice = data.oldPrice;
    this.description = data.description;
    this.timeToPrepare = data.timeToPrepare;
  }
}
