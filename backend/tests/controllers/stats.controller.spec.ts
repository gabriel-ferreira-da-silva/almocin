// backend/tests/controllers/stats.controller.spec.ts
import request from 'supertest';
import app from '../../src/app';
import { expect } from 'chai';

describe('Stats Controller', () => {
  it('should return all stats', async () => {
    const res = await request(app).get('/api/stats/all');
    expect(res.status).to.equal(200);
    expect(res.body).to.include({
      totalUsers: 100,
      totalItems: 50,
      totalRevenue: 10000,
      monthRevenue: 2000,
      totalOrders: 150,
      monthOrders: 30,
      averageTicket: 100,
    });
  });

  it('should return revenue stats', async () => {
    const res = await request(app).get('/api/stats/mon');
    expect(res.status).to.equal(200);
    expect(res.body).to.include({
      totalRevenue: 10000,
      monthRevenue: 2000,
      averageTicket: 100,
    });
  });

  it('should update totalOrders', async () => {
    const res = await request(app)
      .put('/api/stats')
      .send({ totalOrders: 160 });
    expect(res.status).to.equal(204);

    const getRes = await request(app).get('/api/stats/all');
    expect(getRes.body.totalOrders).to.equal(160);
  });

  it('should update multiple stats', async () => {
    const res = await request(app)
      .put('/api/stats')
      .send({ totalUsers: 150, totalItems: 300 });
    expect(res.status).to.equal(204);

    const getRes = await request(app).get('/api/stats/all');
    expect(getRes.body.totalUsers).to.equal(150);
    expect(getRes.body.totalItems).to.equal(300);
  });
});
