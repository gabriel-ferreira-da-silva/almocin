import ItemMenuEntity from '../entities/item-menu.entity';

export default class Database {
  data: { [key: string]: any[] };
  private static instance: Database;

  private constructor() {
    this.data = {};
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  static reset() {
    Database.instance = new Database();
  }

  static seed() {
    const items = [
      'Batata',
      'Arroz',
      'Feijão',
      'Bife',
      'Frango',
      'Peixe',
      'Salada',
      'Macarrão',
      'Pizza',
      'Hambúrguer'
    ];

    Database.getInstance().data = {
      menu: items.map((item, index) => new ItemMenuEntity({
        id: `item-id-${index}`,
        name: item,
        price: Math.floor(Math.random() * 10) + 1, // 1 - 10
        image: `${item.toLowerCase()}.png`,
        available: Math.random() > 0.5, // 50%
        createdAt: new Date(),
        oldPrice: Math.floor(Math.random() * 10), // 0 - 9
        description: `Descrição do ${item}`,
        timeToPrepare: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes
      }))
    };
  }
}
