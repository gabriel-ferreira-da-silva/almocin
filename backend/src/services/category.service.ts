import CategoryEntity from '../entities/category.entity';
import CategoryModel from '../models/category.model';
import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class CategoryService {
  private categoryRepository: CategoryRepository;
  private menuRepository: MenuRepository;

  constructor(
    categoryRepository: CategoryRepository,
    menuRepository: MenuRepository,
  ) {
    this.categoryRepository = categoryRepository;
    this.menuRepository = menuRepository; 
  }

  public async getCategories(): Promise<CategoryModel[]> {
    const entity = await this.categoryRepository.getCategories();
    const menu = await this.menuRepository.getItems();

    const model = entity.map((item) => new CategoryModel({
      ...item,
      items: menu.filter((i) => i.categoryID === item.id),
    }));

    return model;
  }

  public async getCategory(id: string): Promise<CategoryModel> {
    const entity = await this.categoryRepository.getCategory(id);

    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'Não encontrado',
        msgCode: 'Categoria não registrada no sistema',
      });
    }

    const items = await this.menuRepository.getItems();

    const model = new CategoryModel({
      ...entity,
      items: items.filter((i) => i.categoryID === entity.id),
    });

    return model;
  }

  public async createCategory(data: CategoryEntity): Promise<CategoryModel> {
    const entity = await this.categoryRepository.createCategory(data);

    const model = new CategoryModel({
      ...entity,
      items: [],
    });

    return model;
  }

  public async updateCategory(id: string, data: CategoryEntity): Promise<CategoryModel> {
    const entity = await this.categoryRepository.updateCategory(id, data);

    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'Categoria não encontrada',
        msgCode: 'Categoria não pode ser atualizada pois não foi encontrada.',
      });
    }

    const model = new CategoryModel({
      ...entity,
      items: [],
    });

    return model;
  }

  public async deleteCategory(id: string): Promise<void> {
    const items = await this.menuRepository.getItems();

    if (items.some((i) => i.categoryID === id)) {
      throw new HttpNotFoundError({
        msg: 'Categoria não pode ser deletada',
        msgCode: 'Categoria não pode ser deletada pois existem itens associados a ela.',
      });
    }

    await this.categoryRepository.deleteCategory(id);
  }
}

export default CategoryService;
