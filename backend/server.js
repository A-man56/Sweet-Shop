import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import sweetsRoutes from './routes/sweets.js';

dotenv.config();

const app = express();

function normalizeOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return url.replace(/\/$/, '');
  }
}

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sweet-shop-sigma.vercel.app/',
  process.env.FRONTEND_URL ? normalizeOrigin(process.env.FRONTEND_URL) : ''
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/sweets', sweetsRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
