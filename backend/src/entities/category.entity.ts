import BaseEntity from "./base.entity";

export default class CategoryEntity extends BaseEntity {
  name: string;

  constructor(data: CategoryEntity) {
    super(data.id || "");
    this.name = data.name;
  }
}