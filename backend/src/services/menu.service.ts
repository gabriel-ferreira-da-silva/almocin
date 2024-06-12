import ItemMenuEntity from '../entities/item-menu.entity';
import MenuModel from '../models/item-menu.model';
import MenuRepository from '../repositories/menu.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class MenuService {
  private menuRepository: MenuRepository;

  constructor(
    menuRepository: MenuRepository,
  ) {
    this.menuRepository = menuRepository;
  }

  public async getItems(): Promise<MenuModel[]> {
    const entity = await this.menuRepository.getItems();

    const model = entity.map((item) => new MenuModel({
      ...item,
      hasPromotion: item.oldPrice > item.price,
    }));

    return model;
  }

  public async getItem(id: string): Promise<MenuModel> {
    const entity = await this.menuRepository.getItem(id);

    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'Não encontrado',
        msgCode: 'Item não encontrado no cardápio',
      });
    }

    const model = new MenuModel({
      ...entity,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async createItem(data: ItemMenuEntity): Promise<MenuModel> {
    const entity = await this.menuRepository.createItem(data);
    const newId = (await this.menuRepository.getItems()).length + 1;
    const model = new MenuModel({
      ...entity,
      id: newId.toString(), 
      createdAt: new Date(),
      oldPrice: 0,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async updateItem(id: string, data: ItemMenuEntity): Promise<MenuModel> {
    const entity = await this.menuRepository.updateItem(id, data);

    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'Não encontrado',
        msgCode: 'Item não encontrado no cardápio',
      });
    }

    const model = new MenuModel({
      ...entity,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async deleteItem(id: string): Promise<void> {
    await this.menuRepository.deleteItem(id);
  }
}

export default MenuService;
