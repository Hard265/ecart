import request from 'supertest';
import app from '../src/server';
import { Order } from '../src/models/Order';
import { User } from '../src/models/User';
import { Product } from '../src/models/Product';
import { generateToken } from '../src/utils/tokens';

describe('Orders', () => {
  let token: string;
  let user: User;
  let product: Product;

  beforeEach(async () => {
    await Order.destroy({ where: {} });
    await User.destroy({ where: {} });
    await Product.destroy({ where: {} });

    user = await User.create({
      username: 'testuser',
      password: 'TestPassword123!'
    });
    token = generateToken(user.id);

    product = await Product.create({
      name: 'Test Product',
      description: 'This is a test product',
      price: 19.99,
      stock: 100
    });
  });

  it('should create a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          {
            productId: product.id,
            quantity: 2
          }
        ]
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.totalAmount).toBe(39.98);
  });

  it('should get user orders', async () => {
    await Order.create({
      userId: user.id,
      totalAmount: 39.98,
      status: 'pending'
    });

    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  it('should get a single order', async () => {
    const order = await Order.create({
      userId: user.id,
      totalAmount: 39.98,
      status: 'pending'
    });

    const res = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(order.id);
  });

  it('should not allow access to other user\'s order', async () => {
    const otherUser = await User.create({
      username: 'otheruser',
      password: 'OtherPassword123!'
    });
    const order = await Order.create({
      userId: otherUser.id,
      totalAmount: 39.98,
      status: 'pending'
    });

    const res = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(403);
  });
});
