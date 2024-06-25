import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import UserRepository from '../repositories/user.repository';
import LoginService from '../services/login.service';
import RegisterService from '../services/register.service'; 
import OrderRepository from '../repositories/order.repository';
import CategoryService from '../services/category.service';
import MenuService from '../services/menu.service';
import OrderService from '../services/order.service';
import StatsService from '../services/stats.service';
import Injector from './injector';

export const di = new Injector();

di.registerRepository<MenuRepository>(MenuRepository, new MenuRepository());
di.registerRepository<UserRepository>(UserRepository, new UserRepository()); 
di.registerRepository<OrderRepository>(OrderRepository, new OrderRepository());

di.registerRepository<CategoryRepository>(
  CategoryRepository, new CategoryRepository()
);

di.registerService<LoginService>(LoginService, new LoginService(di.getRepository(UserRepository))); 
di.registerService<RegisterService>(RegisterService, new RegisterService(di.getRepository(UserRepository)));

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

di.registerService(
  StatsService,
  new StatsService(
    di.getRepository(MenuRepository),
    di.getRepository(OrderRepository),
    di.getRepository(UserRepository)
  )
);
