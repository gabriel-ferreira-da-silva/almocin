import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import OrderRepository from '../repositories/order.repository';
import CategoryService from '../services/category.service';
import MenuService from '../services/menu.service';
import OrderService from '../services/order.service';
import Injector from './injector';

export const di = new Injector();

di.registerRepository<MenuRepository>(MenuRepository, new MenuRepository());
di.registerRepository<OrderRepository>(OrderRepository, new OrderRepository());

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
  OrderService,
  new OrderService(
    di.getRepository(OrderRepository),
    di.getRepository(MenuRepository),
  )
);
