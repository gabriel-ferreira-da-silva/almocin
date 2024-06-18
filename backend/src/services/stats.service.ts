import { injectable } from 'tsyringe';

interface Stats {
  totalUsers: number;
  totalItems: number;
  totalRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  monthOrders: number;
  averageTicket: number;
}

const stats: Stats = {
  totalUsers: 100,
  totalItems: 50,
  totalRevenue: 10000,
  monthRevenue: 2000,
  totalOrders: 150,
  monthOrders: 30,
  averageTicket: 100
};

@injectable()
class StatsService {
  public async getStats(code: string): Promise<Partial<Stats>> {
    if (code === 'all') {
      return stats;
    } else if (code === 'mon') {
      const { totalRevenue, monthRevenue, averageTicket } = stats;
      return { totalRevenue, monthRevenue, averageTicket };
    }
    return {};
  }

  public async updateStats(updates: Partial<Stats>): Promise<Stats> {
    Object.assign(stats, updates);
    return stats;
  }
}

export default StatsService;
