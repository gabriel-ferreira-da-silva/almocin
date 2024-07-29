import { Router, Request, Response } from 'express';
import { FailureResult, Result, SuccessResult } from '../utils/result';
import MenuService from '../services/menu.service';
import ItemMenuEntity from '../entities/item-menu.entity';
import { HttpNotFoundError } from '../utils/errors/http.error';
import authMiddleware from '../core/authentication';

class MenuController {
  private prefix: string = '/menu';
  public router: Router;
  private menuService: MenuService;

  constructor(router: Router, menuService: MenuService) {
    this.router = router;
    this.menuService = menuService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.use(authMiddleware)
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getItems(req, res)
    );

    this.router.get(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.getItem(req, res)
    );
    this.router.post(this.prefix, (req: Request, res: Response) =>
      this.createItem(req, res)
    );

    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updateItem(req, res)
    );
    this.router.delete(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.deleteItem(req, res)
    );
  }

  private async getItems(req: Request, res: Response) {
    const menu = await this.menuService.getItems();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: menu,
    }).handle(res);
  }

  private async getItem(req: Request, res: Response) {
    const item = await this.menuService.getItem(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: item,
    }).handle(res);
  }

  private async createItem(req: Request, res: Response) {
    const { name, price, categoryID } = req.body;
    if (!name || name == '') {
      return new FailureResult({
        msg: 'O nome é obrigatório',
        code: 400,
      }).handle(res);
    }

    if (!price || price < 0 || Number.isNaN(Number(price))) {
      return new FailureResult({
        msg: 'O preço é obrigatório',
        code: 400,
      }).handle(res);
    }

    if (categoryID && Number.isNaN(Number(categoryID))) {
      return new FailureResult({
        msg: 'A categoria é inválida',
        code: 400,
      }).handle(res);
    }

    try {
      const item = await this.menuService.createItem(new ItemMenuEntity(req.body));
  
      return new SuccessResult({
        msg: `Item ${item.name} adicionado ao cardápio`,
        data: item,
        code: 201,
      }).handle(res);
    } catch (e) {
      const { msg } = e as HttpNotFoundError;
      return new FailureResult({
        msg,
        code: 400,
      }).handle(res)
    }
  }

  private async updateItem(req: Request, res: Response) {
    const { name, price, categoryID } = req.body;
    if (name && name == '') {
      return new FailureResult({
        msg: 'O nome é obrigatório',
        code: 400,
      }).handle(res);
    }

    if (price && (price < 0 || Number.isNaN(Number(price)))) {
      return new FailureResult({
        msg: 'O preço é obrigatório',
        code: 400,
      }).handle(res);
    }

    if (categoryID && Number.isNaN(Number(categoryID))) {
      return new FailureResult({
        msg: 'A categoria é inválida',
        code: 400,
      }).handle(res);
    }

    const item = await this.menuService.updateItem(
      req.params.id,
      new ItemMenuEntity(req.body)
    );

    return new SuccessResult({
      msg: `Item ${item.name} atualizado no cardápio`,
      data: item,
    }).handle(res);
  }

  private async deleteItem(req: Request, res: Response) {
    try {
      const itemName = await this.menuService.deleteItem(req.params.id);
  
      return new SuccessResult({
        msg: `Item ${itemName} removido do cardápio`,
      }).handle(res);
    } catch (e) {
      const { msg } = e as HttpNotFoundError;
      return new FailureResult({
        msg,
        code: 404,
      }).handle(res)
    }
  }
}

export default MenuController;
