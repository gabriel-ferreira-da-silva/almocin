import ItemMenuEntity from "../entities/item-menu.entity";
import BaseModel from "./base.model";

export default class CategoryModel extends BaseModel {
  name: string;
  items: ItemMenuEntity[];

  constructor(data: CategoryModel) {
    super(data.id || '');
    this.name = data.name;
    this.items = data.items || [];
  }
}