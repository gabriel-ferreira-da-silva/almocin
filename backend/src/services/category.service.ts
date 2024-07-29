import CategoryEntity from '../entities/category.entity';
import CategoryModel from '../models/category.model';
import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import { HttpBadRequestError, HttpNotFoundError } from '../utils/errors/http.error';
import { CategoryValidationMessages } from '../utils/validation/validationMessages';

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
        msg: 'Categoria não registrada no sistema',
        msgCode: CategoryValidationMessages.NOT_FOUND_MSG_CODE,
      });
    }

    const items = await this.menuRepository.getItems();

    const model = new CategoryModel({
      ...entity,
      items: items.filter((i) => i.categoryID === entity.id),
    });

    return model;
  }

  public async createCategory(data: CategoryEntity): Promise<string> {
    const alreadyExists = await this.categoryRepository.getCategoryByName(data.name);

    if (alreadyExists) {
      throw new HttpBadRequestError({
        msgCode: 'Categoria já existente.',
        msg: `Categoria ${data.name} já existe no sistema`,
      });
    }
    
    const entity = await this.categoryRepository.createCategory(data);

    return `Categoria ${entity.name} criada com sucesso.`;
  }

  public async updateCategory(id: string, data: CategoryEntity): Promise<string> {
    const alreadyExists = await this.categoryRepository.getCategoryByName(data.name);

    if (alreadyExists) {
      throw new HttpBadRequestError({
        msgCode: CategoryValidationMessages.ALREADY_EXISTS_MSG_CODE,
        msg: `Categoria ${data.name} já existe no sistema`,
      });
    }

    const entity = await this.categoryRepository.updateCategory(id, data);

    if (!entity) {
      throw new HttpNotFoundError({
        msg: 'Categoria não pode ser atualizada pois não foi encontrada.',
        msgCode: CategoryValidationMessages.NOT_FOUND_MSG_CODE,
      });
    }

    return `Categoria ${entity.name} atualizada com sucesso.`;
  }

  public async deleteCategory(id: string): Promise<string> {
    const category = await this.categoryRepository.getCategory(id);
    if (!category) {
      throw new HttpNotFoundError({
        msgCode: CategoryValidationMessages.NOT_FOUND_MSG_CODE,
        msg: 'Categoria não pode ser deletada pois não foi encontrada.',
      });
    }

    const items = await this.menuRepository.getItems();

    if (items.some((i) => i.categoryID === id)) {
      throw new HttpBadRequestError({
        msgCode: CategoryValidationMessages.CANNOT_DELETE_MSG_CODE,
        msg: 'Não é possível deletar pois há itens associados.',
      });
    }

    await this.categoryRepository.deleteCategory(id);

    return category.name;
  }
}

export default CategoryService;
