export interface Stats {
  totalUsers: number;
  totalItems: number;
  totalRevenue: number;
  currentMonthRevenue: number;
  totalOrders: number;
  monthOrders: number;
  averageTicket: number;
  currentMonthAverageTicket: number;
}

export enum StatsFilter {
  ALL = 'all',
  MONTH = 'month',
  MONEY = 'money'
}
