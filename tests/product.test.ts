
import request from 'supertest';
import app from '../src/server';
import { Product } from '../src/models/Product';
import { User } from '../src/models/User';
import { generateToken } from '../src/utils/tokens';

describe('Products', () => {
  let token: string;

  beforeEach(async () => {
    await Product.destroy({ where: {} });
    await User.destroy({ where: {} });
    const user = await User.create({
      username: 'testadmin',
      password: 'AdminPassword123!',
      role: 'admin'
    });
    token = generateToken(user.id);
  });

  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Test Product',
        description: 'This is a test product',
        price: 19.99,
        stock: 100
      });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.name).toBe('Test Product');
  });

  it('should get all products', async () => {
    await Product.create({
      name: 'Product 1',
      description: 'Description 1',
      price: 9.99,
      stock: 50
    });
    await Product.create({
      name: 'Product 2',
      description: 'Description 2',
      price: 19.99,
      stock: 100
    });

    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
  });

  it('should get a single product', async () => {
    const product = await Product.create({
      name: 'Single Product',
      description: 'This is a single product',
      price: 29.99,
      stock: 75
    });

    const res = await request(app).get(`/api/products/${product.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Single Product');
  });

  it('should update a product', async () => {
    const product = await Product.create({
      name: 'Old Name',
      description: 'Old description',
      price: 9.99,
      stock: 50
    });

    const res = await request(app)
      .put(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Name',
        description: 'New description',
        price: 19.99,
        stock: 100
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('New Name');
    expect(res.body.price).toBe(19.99);
  });

  it('should delete a product', async () => {
    const product = await Product.create({
      name: 'To Be Deleted',
      description: 'This product will be deleted',
      price: 39.99,
      stock: 25
    });

    const res = await request(app)
      .delete(`/api/products/${product.id}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);

    const deletedProduct = await Product.findByPk(product.id);
    expect(deletedProduct).toBeNull();
  });
});
