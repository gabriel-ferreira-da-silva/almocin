import ItemMenuEntity from '../entities/item-menu.entity';
import PedidoEntity from '../entities/pedido.entity';

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

    const categories = [
      { id: 'category-id-0', name: 'Bebida' },
      { id: 'category-id-1', name: 'Sobremesa' },
      { id: 'category-id-2', name: 'Vegetariano' },
      { id: 'category-id-3', name: 'Vegano' },
      { id: 'category-id-4', name: 'Sem Glúten' },
      { id: 'category-id-5', name: 'Sem Lactose' },
      { id: 'category-id-6', name: 'Fitness' },
      { id: 'category-id-7', name: 'Gourmet' }
    ]

    const linkItemsCategories = items.map(() => (
      categories[Math.floor(Math.random() * categories.length)].id
    ))

    Database.getInstance().data = {
      menu: items.map((item, index) => new ItemMenuEntity({
        id: `item-id-${index}`,
        name: item,
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
        description: `Descrição do ${item}`,
        image: `${item.toLowerCase()}.png`,
        categoryID: linkItemsCategories[index],
        oldPrice: Math.floor(Math.random() * 10), // 0 - 9
        price: Math.floor(Math.random() * 10) + 1, // 1 - 10
        timeToPrepare: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes
      })),
      category: categories.map((category) => ({
        ...category,
        createdAt: new Date(),
        active: linkItemsCategories.includes(category.id) ?? Math.random() > 0.5
      })),
      pedido: items.map((item, index) => new PedidoEntity({
        id: `pedido-id-${index}`,
        userID: "1",
        pedidoId:"1",
        status: "in makeing",
        name: item,
        items:items,
        description: `Descrição do ${item}`,
        totalPrice: Math.floor(Math.random() * 10), // 0 - 9
        totalPrepareTime: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes
        totalDeliveryTime: Math.floor(Math.random() * 60) + 15, // 15 - 75 minutes
        createdAt: new Date(),
        active: Math.random() > 0.5, // 50%
      })),
    };
  }
}
