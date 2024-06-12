import MenuRepository from '../repositories/menu.repository';
import MenuService from '../services/menu.service';
import Injector from './injector';

export const di = new Injector<
  MenuService,
  MenuRepository
>();

di.registerRepository(MenuRepository, new MenuRepository());
di.registerService(
  MenuService,
  new MenuService(
    di.getRepository(MenuRepository),
  )
);
