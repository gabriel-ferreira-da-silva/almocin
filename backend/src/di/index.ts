import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import PedidoRepository from '../repositories/pedido.repository';
import PedidoController from '../controllers/pedido.controller';
import CategoryService from '../services/category.service';
import MenuService from '../services/menu.service';
import PedidoService from '../services/pedido.service';

import Injector from './injector';

export const di = new Injector();

di.registerRepository<MenuRepository>(MenuRepository, new MenuRepository());
di.registerRepository<PedidoRepository>(PedidoRepository, new PedidoRepository());

di.registerRepository<CategoryRepository>(
  CategoryRepository, new CategoryRepository()
);

di.registerService<MenuService>(
  MenuService,
  new MenuService(
    di.getRepository(MenuRepository),
    di.getRepository(CategoryRepository)
  )
);
di.registerService(
  CategoryService,
  new CategoryService(
    di.getRepository(CategoryRepository),
    di.getRepository(MenuRepository)
  )
);

di.registerService(
  PedidoService,
  new PedidoService(
    di.getRepository(PedidoRepository),
    di.getRepository(MenuRepository),
    di.getRepository(CategoryRepository)
  )
);
