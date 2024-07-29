import MenuRepository from "../repositories/menu.repository";
import OrderRepository from "../repositories/order.repository";
import UserRepository from "../repositories/user.repository";
import { Stats, StatsFilter } from "../types/stats";

class StatsService {
  private menuRepository: MenuRepository;
  private orderRepository: OrderRepository;
  private userRepository: UserRepository;

  constructor(
    menuRepository: MenuRepository,
    orderRepository: OrderRepository,
    userRepository: UserRepository
  ) {
    this.menuRepository = menuRepository;
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
  }

  public async getStats(filter: StatsFilter): Promise<Partial<Stats>> {
    const orders = await this.orderRepository.getOrders();
    const users = await this.userRepository.getUsers();
    const items = await this.menuRepository.getItems();
    const currentDate = new Date();

    const totalRevenue = orders.reduce(
      (acc, order) => acc + order.totalPrice, 0
    );
    const currentMonthRevenue = orders.reduce(
      (acc, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getMonth() === currentDate.getMonth()) {
          return acc + order.totalPrice;
        }
        return acc;
      }, 0
    );
    const totalOrders = orders.length;
    const monthOrders = orders.reduce(
      (acc, order) => {
        const orderDate = new Date(order.createdAt);
        if (orderDate.getMonth() === currentDate.getMonth()) {
          return acc + 1;
        }
        return acc;
      }, 0
    );
    const averageTicket = totalRevenue / totalOrders;
    const currentMonthAverageTicket = currentMonthRevenue / monthOrders;

    let model: Partial<Stats> = {};

    switch (filter) {
      case StatsFilter.MONTH:
        model = {
          currentMonthRevenue,
          monthOrders,
          currentMonthAverageTicket
        };

      break;
      case StatsFilter.MONEY:
        model = {
          totalRevenue,
          currentMonthRevenue,
          currentMonthAverageTicket,
          averageTicket
        };

      break;
      default:
        model = {
          totalUsers: users.length,
          totalItems: items.length,
          totalRevenue: totalRevenue,
          currentMonthRevenue: currentMonthRevenue,
          totalOrders: totalOrders,
          monthOrders: monthOrders,
          averageTicket: averageTicket,
          currentMonthAverageTicket: currentMonthAverageTicket
        };

    } 

    return model;
  }
}

export default StatsService;
