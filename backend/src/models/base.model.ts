export default class BaseModel {
  id: string;
  createdAt: Date;
  active: boolean;

  constructor(id: string) {
    this.id = id;
    this.active = true;
    this.createdAt = new Date();
  }
}
