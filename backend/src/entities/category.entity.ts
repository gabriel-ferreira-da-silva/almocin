import BaseEntity from "./base.entity";

export default class CategoryEntity extends BaseEntity {
  name: string;
  itemsId: string[];

  constructor(data: CategoryEntity) {
    super(data.id || "");
    this.name = data.name;
    this.itemsId = data.itemsId || [];
  }
}