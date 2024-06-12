import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import MenuService from '../services/menu.service';
import ItemMenuEntity from '../entities/item-menu.entity';

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
    const test = await this.menuService.getItem(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async createItem(req: Request, res: Response) {
    const test = await this.menuService.createItem(new ItemMenuEntity(req.body));

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async updateItem(req: Request, res: Response) {
    const test = await this.menuService.updateItem(
      req.params.id,
      new ItemMenuEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: test,
    }).handle(res);
  }

  private async deleteItem(req: Request, res: Response) {
    await this.menuService.deleteItem(req.params.id);

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
    }).handle(res);
  }
}

export default MenuController;
