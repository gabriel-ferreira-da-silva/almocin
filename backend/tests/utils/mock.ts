import CategoryEntity from "../../src/entities/category.entity";
import ItemMenuEntity from "../../src/entities/item-menu.entity";
import BaseRepository from "../../src/repositories/base.repository";

export class mockBaseRepository extends BaseRepository<any> {
  add = jest.fn();
  update = jest.fn();
  findOne = jest.fn();
  findAll = jest.fn();
  delete = jest.fn();
}

export const categoryMockDatabase: CategoryEntity[] = [
  {
    id: '0',
    name: 'Promoção',
    itemsId: [],
    active: true,
    createdAt: new Date(),
  },
  {
    id: '1',
    name: 'Bebidas',
    itemsId: ['1', '4'],
    active: true,
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Vegetariano',
    itemsId: [],
    active: true,
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Jantar',
    itemsId: [],
    active: true,
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Aperitivos',
    itemsId: ['1'],
    active: true,
    createdAt: new Date(),
  },
  {
    id: '5',
    name: 'Sobremesas',
    itemsId: ['1', '3'],
    active: true,
    createdAt: new Date(),
  }
]

export const menuMockDatabase: ItemMenuEntity[] = [
  {
    id: '0',
    name: 'Coca-cola',
    price: 5.0,
    categoryID: '1',
    active: true,
    createdAt: new Date(),
    description: 'Geladinha',
    image: 'coca-cola.jpg',
    timeToPrepare: 5,
    oldPrice: 0,
  },
  {
    id: '1',
    name: 'Hamburguer',
    price: 15.0,
    categoryID: '5',
    active: true,
    createdAt: new Date(),
    description: 'feito de carne',
    image: 'ham.jpg',
    timeToPrepare: 10,
    oldPrice: 0,
  },
  {
    id: '2',
    name: 'Batata Frita',
    price: 10.0,
    categoryID: '4',
    active: true,
    createdAt: new Date(),
    description: 'Sem Oléo',
    image: 'bt.jpg',
    timeToPrepare: 5,
    oldPrice: 0,
  },
  {
    id: '3',
    name: 'Sorvete',
    price: 7.0,
    categoryID: '5',
    active: true,
    createdAt: new Date(),
    description: 'Chocolate',
    image: 'ice-cream.jpg',
    timeToPrepare: 5,
    oldPrice: 0,
  },
  {
    id: '4',
    name: 'Cerveja',
    price: 8.0,
    categoryID: '1',
    active: true,
    createdAt: new Date(),
    description: 'Cerveja gelada',
    image: 'cerveja.jpg',
    timeToPrepare: 5,
    oldPrice: 0,
  }
]