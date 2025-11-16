import express from 'express';
import Sweet from '../models/Sweet.js';
import { authenticate, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all sweets
router.get('/', async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Search sweets
router.get('/search', async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (category) filter.category = category;

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.json(sweets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create sweet (Admin)
router.post('/', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity, description, image } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sweet = new Sweet({
      name,
      category,
      price,
      quantity: quantity ?? 0,
      description,
      image
    });

    await sweet.save();

    res.status(201).json(sweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update sweet (Admin)
router.put('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const { name, category, price, quantity, description, image } = req.body;

    const sweet = await Sweet.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        price,
        quantity,
        description,
        image,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json(sweet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete sweet (Admin)
router.delete('/:id', authenticate, adminOnly, async (req, res) => {
  try {
    const sweet = await Sweet.findByIdAndDelete(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    res.json({ message: 'Sweet deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Purchase sweet (User)
router.post('/:id/purchase', authenticate, async (req, res) => {
  try {
    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    if (sweet.quantity <= 0) {
      return res.status(400).json({ error: 'Out of stock' });
    }

    sweet.quantity -= 1;
    await sweet.save();

    res.json({ message: 'Purchase successful', sweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Restock sweet (Admin)
router.post('/:id/restock', authenticate, adminOnly, async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid restock amount' });
    }

    const sweet = await Sweet.findById(req.params.id);

    if (!sweet) {
      return res.status(404).json({ error: 'Sweet not found' });
    }

    sweet.quantity += amount;
    await sweet.save();

    res.json({ message: 'Restock successful', sweet });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
