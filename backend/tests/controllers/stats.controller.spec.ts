// backend/tests/controllers/stats.controller.spec.ts
import request from 'supertest';
import app from '../../src/app';
import { defaultStats } from '../../src/types/stats';

describe('Stats Controller', () => {
  it('should return all stats', async () => {
    const res = await request(app).get('/api/stats/all');
    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual(defaultStats);
  });

  it('should return revenue stats', async () => {
    const res = await request(app).get('/api/stats/mon');
    expect(res.status).toEqual(200);
    expect(res.body.data).toEqual({
      totalRevenue: 10000,
      monthRevenue: 2000,
      averageTicket: 100,
    });
  });

  it('should update totalOrders', async () => {
    const res = await request(app)
      .put('/api/stats')
      .send({ totalOrders: 160 });
    expect(res.status).toEqual(200);

    const getRes = await request(app).get('/api/stats/all');
    expect(getRes.body.data.totalOrders).toEqual(160);
  });

  it('should update multiple stats', async () => {
    const res = await request(app)
      .put('/api/stats')
      .send({ totalUsers: 150, totalItems: 300 });
    expect(res.status).toEqual(200);

    const getRes = await request(app).get('/api/stats/all');
    expect(getRes.body.data.totalUsers).toEqual(150);
    expect(getRes.body.data.totalItems).toEqual(300);
  });
});
