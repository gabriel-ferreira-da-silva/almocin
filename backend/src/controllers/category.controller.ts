import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import CategoryService from '../services/category.service';
import CategoryEntity from '../entities/category.entity';

class CategoryController {
  private prefix: string = '/category';
  public router: Router;
  private categoryService: CategoryService;

  constructor(router: Router, categoryService: CategoryService) {
    this.router = router;
    this.categoryService = categoryService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getCategories(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getCategory(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createCategory(req, res)
    );

    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateCategory(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteCategory(req, res)
    );
  }

  private async getCategories(req: Request, res: Response) {
    const data = await this.categoryService.getCategories();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: data,
    }).handle(res);
  }

  private async getCategory(req: Request, res: Response) {
    const data = await this.categoryService.getCategory(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: data,
    }).handle(res);
  }

  private async createCategory(req: Request, res: Response) {
    const data = await this.categoryService.createCategory(
      new CategoryEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: data,
    }).handle(res);
  }

  private async updateCategory(req: Request, res: Response) {
    const data = await this.categoryService.updateCategory(
      req.params.id,
      new CategoryEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: data,
    }).handle(res);
  }

  private async deleteCategory(req: Request, res: Response) {
    await this.categoryService.deleteCategory(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default CategoryController;

