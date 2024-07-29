import { Router, Request, Response } from 'express';
import { FailureResult, Result, SuccessResult } from '../utils/result';
import CategoryService from '../services/category.service';
import CategoryEntity from '../entities/category.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';
import { CategoryValidationMessages } from '../utils/validation/validationMessages';
import authMiddleware from '../core/authentication';

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
    this.router.use(authMiddleware)
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
    try {
      const data = await this.categoryService.getCategory(req.params.id);
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: data,
      }).handle(res);
    } catch (e) {
      const { msg, msgCode } = e as HttpNotFoundError;
      return new FailureResult({
        msg,
        msgCode,
        code: 404,
      }).handle(res);
    }
  }

  private async createCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.createCategory(
        new CategoryEntity(req.body)
      );
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: data,
        code: 201,
      }).handle(res);
    } catch (e) {
      const { msg, msgCode } = e as HttpNotFoundError;
      return new FailureResult({
        msg,
        msgCode,
        code: 400,
      }).handle(res);
    }
  }

  private async updateCategory(req: Request, res: Response) {
    try {
      const data = await this.categoryService.updateCategory(
        req.params.id,
        new CategoryEntity(req.body)
      );
  
      return new SuccessResult({
        msg: Result.transformRequestOnMsg(req),
        data: data,
      }).handle(res);
    } catch (e) {
      const { msg, msgCode } = e as HttpNotFoundError;
      
      return new FailureResult({
        msg,
        msgCode,
        code: msgCode === CategoryValidationMessages.NOT_FOUND_MSG_CODE ? 404 : 400,
      }).handle(res);
    }
  }

  private async deleteCategory(req: Request, res: Response) {
    try {
      const itemName = await this.categoryService.deleteCategory(req.params.id);
  
      return new SuccessResult({
        msg: `Categoria ${itemName} removido do cardápio`,
      }).handle(res);
    } catch (e) {
      const { msg, msgCode } = e as HttpNotFoundError;
      
      return new FailureResult({
        msg,
        msgCode,
        code: msgCode === CategoryValidationMessages.NOT_FOUND_MSG_CODE ? 404 : 400,
      }).handle(res);
    }
  }
}

export default CategoryController;

