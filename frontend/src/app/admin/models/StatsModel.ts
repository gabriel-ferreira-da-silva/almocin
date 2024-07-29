export enum StatsFilter {
  ALL = 'all',
  MONTH = 'month',
  MONEY = 'money'
}

export interface StatsModel {
  totalUsers: number;
  totalItems: number;
  totalRevenue: number;
  totalOrders: number;
  monthOrders: number;
  averageTicket: number;
  currentMonthRevenue: number;
  currentMonthAverageTicket: number;
}