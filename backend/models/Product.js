const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      maxlength: [5000, 'Description cannot exceed 5000 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be non-negative'],
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    discount: {
      type: Number,
      default: 0,
    },
    images: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    },

    // Artisan who crafted the item
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      default: null,
    },
    artisanId: {
      type: String,
      trim: true,
      default: null,
    },
    artisanName: {
      type: String,
      trim: true,
      default: 'Master Craftsperson',
    },

    // Cultural tradition
    tradition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tradition',
      default: null,
    },
    traditionId: {
      type: String,
      trim: true,
      default: null,
    },

    // Geography & Taxonomy
    state: {
      type: String,
      required: [true, 'State of origin is required'],
      trim: true,
    },
    district: {
      type: String,
      trim: true,
    },
    region: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true, // e.g. "Folk Art & Paintings", "Heritage Textiles & Handlooms", "Ceramics & Pottery"
    },

    // Stock & Rating
    stock: {
      type: Number,
      default: 10,
      min: [0, 'Stock cannot be negative'],
    },
    rating: {
      type: Number,
      default: 4.8,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    reviewsCount: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Authentic GI Certification
    giTagNumber: {
      type: String,
      trim: true, // e.g. "GI-IN-0012"
    },
    isGiCertified: {
      type: Boolean,
      default: true,
    },

    // Physical Specifications
    materials: {
      type: [String],
      default: [],
    },
    dimensions: {
      type: String,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    craftingTime: {
      type: String,
      trim: true, // e.g. "14 Days of Handwork"
    },

    // Operational Status
    status: {
      type: String,
      enum: ['available', 'out_of_stock', 'archived', 'Active'],
      default: 'available',
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Search indexing
productSchema.index({ name: 'text', description: 'text', category: 'text', state: 'text', craft: 'text' });

module.exports = mongoose.model('Product', productSchema);
