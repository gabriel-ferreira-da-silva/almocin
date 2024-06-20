import ItemMenuEntity from '../entities/item-menu.entity';
import BaseRepository from './base.repository';

class MenuRepository extends BaseRepository<ItemMenuEntity> {
  constructor() {
    super('menu');
  }

  public async getItems(): Promise<ItemMenuEntity[]> {
    return await this.findAll();
  }

  public async getItem(id: string): Promise<ItemMenuEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async getItemByName(name: string): Promise<ItemMenuEntity | null> {
    return await this.findOne((item) => item.name === name);
  }

  public async createItem(data: ItemMenuEntity): Promise<ItemMenuEntity> {
    return await this.add(data);
  }

  public async updateItem(
    id: string,
    data: ItemMenuEntity
  ): Promise<ItemMenuEntity> {
    return await this.update((item) => item.id === id, data) as ItemMenuEntity;
  }

  public async deleteItem(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }
}

export default MenuRepository;
