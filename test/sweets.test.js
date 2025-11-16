// tests/sweets.test.js
import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Sweet from '../models/Sweet.js';
import sweetsRoutes from '../routes/sweets.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/sweets', sweetsRoutes);

describe('Sweets Routes', () => {
  beforeAll(async () => {
    const uri =
      process.env.MONGODB_TEST_URI ||
      'mongodb://localhost:27017/sweet-shop-test';

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await Sweet.deleteMany({});
    await mongoose.connection.close();
  });

  test('should get all sweets', async () => {
    const res = await request(app).get('/api/sweets');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('should search sweets by name', async () => {
    const sweet = new Sweet({
      name: 'Chocolate Cake',
      category: 'Cake',
      price: 5.99,
      quantity: 10,
    });
    await sweet.save();

    const res = await request(app)
      .get('/api/sweets/search')
      .query({ name: 'Chocolate' });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
