import { Router, Request, Response } from 'express';
import { Result, SuccessResult } from '../utils/result';
import MenuService from '../services/menu.service';
import ItemMenuEntity from '../entities/item-menu.entity';
import PedidoService from '../services/pedido.service';
import PedidoEntity from '../entities/pedido.entity';

class PedidoController {
  private prefix: string = '/pedido';
  public router: Router;
  private pedidoService: PedidoService;

  constructor(router: Router, pedidoService: PedidoService) {
    this.router = router;
    this.pedidoService = pedidoService;
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(this.prefix, (req: Request, res: Response) =>
      this.getPedidos(req, res)
    );
    this.router.put(`${this.prefix}/:id`, (req: Request, res: Response) =>
      this.updatePedido(req, res)
    );
  }

  private async getPedidos(req: Request, res: Response) {
    const menu = await this.pedidoService.getPedidos();

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: menu,
    }).handle(res);
  }

  private async updatePedido(req: Request, res: Response) {
    const item = await this.pedidoService.updatePedido(
      req.params.id,
      new PedidoEntity(req.body)
    );

    return new SuccessResult({
      msg: Result.transformRequestOnMsg(req),
      data: item,
    }).handle(res);
  }

}

export default PedidoController;
