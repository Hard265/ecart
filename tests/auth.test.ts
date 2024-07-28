
import request from 'supertest';
import app from '../src/server'; // Adjust the import path as needed
import { User } from '../src/models/User';

describe('Authentication', () => {
  beforeEach(async () => {
    await User.destroy({ where: {} });
  });

  it('should sign up a new user', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'testuser',
        password: 'TestPassword123!'
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('User created successfully!');
  });

  it('should not sign up a user with an existing username', async () => {
    await User.create({
      username: 'existinguser',
      password: 'SomePassword123!'
    });

    const res = await request(app)
      .post('/api/auth/signup')
      .send({
        username: 'existinguser',
        password: 'TestPassword123!'
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Username already exists');
  });

  it('should login a user', async () => {
    await User.create({
      username: 'loginuser',
      password: await bcrypt.hash('TestPassword123!', 10)
    });

    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'loginuser',
        password: 'TestPassword123!'
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with incorrect credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'nonexistentuser',
        password: 'WrongPassword123!'
      });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});
