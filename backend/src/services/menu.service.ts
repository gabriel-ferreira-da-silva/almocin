import ItemMenuEntity from '../entities/item-menu.entity';
import MenuModel from '../models/item-menu.model';
import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class MenuService {
  private menuRepository: MenuRepository;
  private categoryRepository: CategoryRepository;

  constructor(
    menuRepository: MenuRepository,
    categoryRepository: CategoryRepository
  ) {
    this.menuRepository = menuRepository;
    this.categoryRepository = categoryRepository;
  }

  public async getItems(): Promise<MenuModel[]> {
    const entity = await this.menuRepository.getItems();
    const categories = await this.categoryRepository.getCategories();

    const model = entity.map((item) => new MenuModel({
      ...item,
      category: categories?.find((c) => c.id === item.categoryID) || null,
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

    const category = await this.categoryRepository.getCategory(entity.categoryID);
    const model = new MenuModel({
      ...entity,
      category: category || null,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async createItem(data: ItemMenuEntity): Promise<MenuModel> {
    const alreadyExists = await this.menuRepository.getItemByName(data.name);

    if (alreadyExists) {
      throw new HttpNotFoundError({
        msgCode: 'Já existe',
        msg: `Item ${data.name} já existe no cardápio`,
      });
    }

    const price = parseFloat(data.price.toFixed(2));
    const entity = await this.menuRepository.createItem(data);
    const category = await this.categoryRepository.getCategory(entity.categoryID);
    const model = new MenuModel({
      ...entity,
      price: price,
      oldPrice: price,
      category: category || null,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async updateItem(id: string, data: ItemMenuEntity): Promise<MenuModel> {
    const previousItem = await this.menuRepository.getItem(id);
    if (!previousItem) {
      throw new HttpNotFoundError({
        msgCode: 'Não encontrado',
        msg: 'Item não encontrado no cardápio',
      });
    }

    const newData: ItemMenuEntity = new ItemMenuEntity({
      ...previousItem,
      name: data?.name ?? previousItem.name,
      image: data?.image ?? previousItem.image,
      active: data?.active ?? previousItem.active,
      timeToPrepare: data?.timeToPrepare ?? previousItem.timeToPrepare,
      categoryID: data?.categoryID ?? previousItem.categoryID,
      description: data?.description ?? previousItem.description,
      price: data?.price ?? previousItem.price,
      oldPrice: data.price ? previousItem.price : previousItem.oldPrice,
    });

    const entity = await this.menuRepository.updateItem(id, newData);

    const category = await this.categoryRepository.getCategory(entity.categoryID);

    const model = new MenuModel({
      ...entity,
      category: category || null,
      hasPromotion: entity.oldPrice > entity.price,
    });

    return model;
  }

  public async deleteItem(id: string): Promise<string> {
    const entity = await this.menuRepository.getItem(id);

    if (!entity) {
      throw new HttpNotFoundError({
        msgCode: 'Não encontrado',
        msg: 'Item não encontrado no cardápio',
      });
    }
    await this.menuRepository.deleteItem(id);
    return entity.name;
  }
}

export default MenuService;
