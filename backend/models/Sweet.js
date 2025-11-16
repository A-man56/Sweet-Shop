import mongoose from 'mongoose';

const sweetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  // Price in rupees
  price: {
    type: Number,
    required: true,
    min: 0
  },

  // Unit of measurement
  unit: {
    type: String,
    enum: ['kg', 'g', 'piece', 'dozen', 'box', 'packet'],
    default: 'piece'
  },

  quantity: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },

  description: String,

  // Image (URL or filename)
  image: {
    type: String,
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  },

  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Automatically update updatedAt on save
sweetSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Automatically update updatedAt on update queries
sweetSchema.pre(['findOneAndUpdate', 'updateOne', 'updateMany'], function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

const Sweet = mongoose.model('Sweet', sweetSchema);

export default Sweet;
