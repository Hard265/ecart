
import request from 'supertest';
import app from '../src/server';
import { Order } from '../src/models/Order';
import { User } from '../src/models/User';
import { generateToken } from '../src/utils/tokens';
import Stripe from 'stripe';

// Mock Stripe
jest.mock('stripe');

describe('Payments', () => {
  let token: string;
  let user: User;
  let order: Order;

  beforeEach(async () => {
    await Order.destroy({ where: {} });
    await User.destroy({ where: {} });

    user = await User.create({
      username: 'testuser',
      password: 'TestPassword123!'
    });
    token = generateToken(user.id);

    order = await Order.create({
      userId: user.id,
      totalAmount: 39.98,
      status: 'pending'
    });

    // Mock Stripe paymentIntents.create
    (Stripe.prototype.paymentIntents.create as jest.Mock).mockResolvedValue({
      client_secret: 'test_client_secret'
    });
  });

  it('should create a payment intent', async () => {
    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .set('Authorization', `Bearer ${token}`)
      .send({ orderId: order.id });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('clientSecret');
    expect(res.body.clientSecret).toBe('test_client_secret');
  });

  it('should not create a payment intent for non-existent order', async () => {
    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .set('Authorization', `Bearer ${token}`)
      .send({ orderId: 9999 });

    expect(res.statusCode).toBe(404);
  });

  it('should not create a payment intent for another user\'s order', async () => {
    const otherUser = await User.create({
      username: 'otheruser',
      password: 'OtherPassword123!'
    });
    const otherOrder = await Order.create({
      userId: otherUser.id,
      totalAmount: 29.99,
      status: 'pending'
    });

    const res = await request(app)
      .post('/api/payments/create-payment-intent')
      .set('Authorization', `Bearer ${token}`)
      .send({ orderId: otherOrder.id });

    expect(res.statusCode).toBe(403);
  });
});
