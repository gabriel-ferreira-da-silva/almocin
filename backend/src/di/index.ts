import CategoryRepository from '../repositories/category.repository';
import MenuRepository from '../repositories/menu.repository';
import UserRepository from '../repositories/user.repository';
import CategoryService from '../services/category.service';
import MenuService from '../services/menu.service';
import LoginService from '../services/login.service';
import RegisterService from '../services/register.service'; 
import Injector from './injector';

export const di = new Injector();

di.registerRepository<MenuRepository>(MenuRepository, new MenuRepository());
di.registerRepository<CategoryRepository>(CategoryRepository, new CategoryRepository());
di.registerRepository<UserRepository>(UserRepository, new UserRepository()); 

di.registerService<MenuService>(MenuService, new MenuService(di.getRepository(MenuRepository), di.getRepository(CategoryRepository)));
di.registerService<CategoryService>(CategoryService, new CategoryService(di.getRepository(CategoryRepository), di.getRepository(MenuRepository)));
di.registerService<LoginService>(LoginService, new LoginService(di.getRepository(UserRepository))); 
di.registerService<RegisterService>(RegisterService, new RegisterService(di.getRepository(UserRepository))); 
