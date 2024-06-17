import { Express, Router } from 'express';
import { di } from '../di';
import MenuController from '../controllers/menu.controller';
import MenuService from '../services/menu.service';
import CategoryService from '../services/category.service';
import CategoryController from '../controllers/category.controller';

import OrderService from '../services/order.service';
import OrderController from '../controllers/order.controller';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    `${prefix}`,
    new MenuController(router, di.getService(MenuService)).router
  )
  app.use(
    `${prefix}`,
    new CategoryController(router, di.getService(CategoryService)).router
  )
  app.use(
    `${prefix}`,
    new OrderController(router, di.getService(OrderService)).router
  )
  
  app.use((_, res) => {
    res.status(404).send({ message: 'Rota não encontrada.' });
  }) 
};
