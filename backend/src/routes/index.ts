import { Express, Router } from 'express';
import { di } from '../di';
import MenuController from '../controllers/menu.controller';
import MenuService from '../services/menu.service';

const router = Router();
const prefix = '/api';

export default (app: Express) => {
  app.use(
    `${prefix}`,
    new MenuController(router, di.getService(MenuService)).router
  )
  app.use((_, res) => {
    res.status(404).send({ message: 'Rota não encontrada.' });
  }) 
};
