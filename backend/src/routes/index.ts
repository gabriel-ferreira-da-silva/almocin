import { Express, Router } from 'express';
import { di } from '../di';
import MenuController from '../controllers/menu.controller';
import MenuService from '../services/menu.service';
import CategoryService from '../services/category.service';
import CategoryController from '../controllers/category.controller';
import LoginController from '../controllers/login.controller';
import LoginService from '../services/login.service';
import RegisterController from '../controllers/register.controller'; // Adicione isto
import RegisterService from '../services/register.service'; // Adicione isto

import OrderService from '../services/order.service';
import OrderController from '../controllers/order.controller';
import StatsController from '../controllers/stats.controller';
import StatsService from '../services/stats.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    `${prefix}`,
    new LoginController(router, di.getService(LoginService)).router
  );

  app.use(
    `${prefix}`,
    new RegisterController(router, di.getService(RegisterService)).router
  );

  app.use(
    `${prefix}`,
    new MenuController(router, di.getService(MenuService)).router,
  );

  app.use(
    `${prefix}`,
    new CategoryController(router, di.getService(CategoryService)).router
  );

  app.use(
    `${prefix}`,
    new OrderController(router, di.getService(OrderService)).router
  )

  app.use(
    `${prefix}`,
    new StatsController(router, di.getService(StatsService)).router
  )
  
  app.use((_, res) => {
    res.status(404).send({ message: 'Rota não encontrada.' });
  });
};
