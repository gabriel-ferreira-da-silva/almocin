import { Stats, StatsPeriod, defaultStats } from "../types/stats";

class StatsService {
  public async getStats(code: StatsPeriod): Promise<Partial<Stats>> {
    if (code === StatsPeriod.ALL) {
      return defaultStats;
    } else if (code === StatsPeriod.MONTH) {
      const { totalRevenue, monthRevenue, averageTicket } = defaultStats;
      return { totalRevenue, monthRevenue, averageTicket };
    }
    return {};
  }

  public async updateStats(updates: Partial<Stats>): Promise<Stats> {
    Object.assign(defaultStats, updates);
    return defaultStats;
  }
}

export default StatsService;
