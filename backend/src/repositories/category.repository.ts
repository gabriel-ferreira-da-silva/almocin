import CategoryEntity from '../entities/category.entity';
import BaseRepository from './base.repository';

class CategoryRepository extends BaseRepository<CategoryEntity> {
  constructor() {
    super('category');
  }

  public async getCategories(): Promise<CategoryEntity[]> {
    return await this.findAll();
  }

  public async getCategory(id: string): Promise<CategoryEntity | null> {
    return await this.findOne((item) => item.id === id);
  }

  public async createCategory(data: CategoryEntity): Promise<CategoryEntity> {
    return await this.add(data);
  }

  public async updateCategory(
    id: string,
    data: CategoryEntity
  ): Promise<CategoryEntity | null> {
    return await this.update((item) => item.id === id, data);
  }

  public async deleteCategory(id: string): Promise<void> {
    await this.delete((item) => item.id !== id);
  }

  public async getCategoryByName(name: string): Promise<CategoryEntity | null> {
    return await this.findOne((item) => item.name === name);
  }
}

export default CategoryRepository;

