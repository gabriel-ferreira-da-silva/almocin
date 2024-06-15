import ItemMenuEntity from '../entities/item-menu.entity';
import PedidoEntity from '../entities/pedido.entity';
import MenuModel from '../models/item-menu.model';
import PedidoModel from '../models/pedido.model';
import CategoryRepository from '../repositories/category.repository';
import PedidoRepository from '../repositories/pedido.repository';
import MenuRepository from '../repositories/menu.repository';
import { HttpNotFoundError } from '../utils/errors/http.error';

class PedidoService {
  private pedidoRepository: PedidoRepository;
  private menuRepository: MenuRepository;
  private categoryRepository: CategoryRepository;

  constructor(
    pedidoRepository: PedidoRepository,
    menuRepository: MenuRepository,
    categoryRepository: CategoryRepository
  ) {
    this.pedidoRepository = pedidoRepository;
    this.menuRepository = menuRepository;
    this.categoryRepository = categoryRepository;
  }

  public async getPedidos(): Promise<PedidoModel[]> {
    const entity = await this.pedidoRepository.getPedidos();
    const menu = await this.menuRepository.getItems();
    const model = entity.map((item) => new PedidoModel({
      ...item,
      items: menu.filter((i) => i.categoryID === item.id),
    }));
    return model;
  }

}

export default PedidoService;
