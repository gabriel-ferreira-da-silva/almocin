export interface Stats {
  totalUsers: number;
  totalItems: number;
  totalRevenue: number;
  monthRevenue: number;
  totalOrders: number;
  monthOrders: number;
  averageTicket: number;
}

export const defaultStats: Stats = {
  totalUsers: 100,
  totalItems: 50,
  totalRevenue: 10000,
  monthRevenue: 2000,
  totalOrders: 150,
  monthOrders: 30,
  averageTicket: 100
};

export enum StatsPeriod {
  ALL = 'all',
  MONTH = 'mon'
}