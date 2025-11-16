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
    // fallback: strip trailing slash if present
    return url ? url.replace(/\/$/, '') : '';
  }
}

// Build allowed origins list from constants + env var ALLOWED_ORIGINS (comma-separated)
const defaultAllowed = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://sweet-shop-sigma.vercel.app' // removed trailing slash for consistency
];

// ALLOWED_ORIGINS env var example:
// https://your-frontend.com,https://sweet-shop-vl30.onrender.com
const envAllowed = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean);

// also allow a single FRONTEND_URL env var for backward compatibility
const singleFrontend = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];

const allowedOrigins = [...defaultAllowed, ...envAllowed, ...singleFrontend]
  .map(normalizeOrigin)
  .filter(Boolean);

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Log incoming origin for debugging in Render logs
    console.log('CORS check - incoming Origin header:', origin);
    // allow requests with no origin (curl, server-to-server, some mobile/webviews)
    if (!origin) {
      return callback(null, true);
    }
    // exact match
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    // optional: allow any subdomain of onrender.com (uncomment if you want)
    // if (origin.endsWith('.onrender.com')) return callback(null, true);

    // optional: allow any subdomain of vercel.app (uncomment if you want)
    // if (origin.endsWith('.vercel.app')) return callback(null, true);

    console.warn('CORS blocked origin:', origin);
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true
};

app.use(cors(corsOptions));
// ensure preflight requests are handled
app.options('*', cors(corsOptions));

app.use(express.json());

// --- rest of your code unchanged ---
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
