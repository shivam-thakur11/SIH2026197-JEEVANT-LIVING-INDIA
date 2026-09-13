const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Workshop title is required'],
      trim: true,
    },

    // The artisan conducting this workshop
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      required: [true, 'Artisan reference is required'],
    },

    craft: {
      type: String,
      trim: true, // e.g. "Madhubani Painting"
    },
    description: {
      type: String,
      trim: true,
      maxlength: [3000, 'Description cannot exceed 3000 characters'],
    },

    // Workshop Details
    mode: {
      type: String,
      enum: ['Live Virtual', 'In-Person', 'Hybrid Residency', 'Recorded'],
      default: 'Live Virtual',
    },
    location: {
      type: String,
      trim: true,
      default: 'Online Virtual Studio',
    },
    date: {
      type: String,
      trim: true, // e.g. "14 Sep 2026"
    },
    time: {
      type: String,
      trim: true, // e.g. "11:00 AM - 01:30 PM IST"
    },

    // Pricing & Capacity
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    fee: {
      type: String,
      trim: true, // e.g. "₹899"
    },
    capacity: {
      type: Number,
      default: 30,
      min: 1,
    },
    seatsTotal: {
      type: Number,
      default: 30,
      min: 1,
    },
    enrolled: {
      type: Number,
      default: 0,
      min: 0,
    },
    seatsBooked: {
      type: Number,
      default: 0,
      min: 0,
    },
    availableSeats: {
      type: Number,
      default: 30,
      min: 0,
    },

    // Cultural tradition and State
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
    state: {
      type: String,
      trim: true,
    },

    // Status: Upcoming, Full, Completed, Cancelled
    status: {
      type: String,
      enum: ['Upcoming', 'Full', 'Completed', 'Cancelled', 'Active'],
      default: 'Upcoming',
    },

    // Media
    image: {
      type: String,
      default: null,
    },

    // Admin moderation
    isApproved: {
      type: Boolean,
      default: true,
    },
    isDemoData: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Sync capacity <-> seatsTotal, enrolled <-> seatsBooked, price <-> fee
workshopSchema.pre('save', function (next) {
  if (this.capacity && !this.seatsTotal) this.seatsTotal = this.capacity;
  if (this.seatsTotal && !this.capacity) this.capacity = this.seatsTotal;

  if (this.enrolled !== undefined && this.seatsBooked === undefined) this.seatsBooked = this.enrolled;
  if (this.seatsBooked !== undefined && this.enrolled === undefined) this.enrolled = this.seatsBooked;

  if (this.price !== undefined && !this.fee) {
    this.fee = this.price === 0 ? 'Free' : `₹${this.price.toLocaleString('en-IN')}`;
  }
  next();
});

const Workshop = mongoose.model('Workshop', workshopSchema);

module.exports = Workshop;
