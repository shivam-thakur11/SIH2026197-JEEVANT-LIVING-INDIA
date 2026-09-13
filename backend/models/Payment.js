const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    // User who paid / learner
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    // Workshop attended
    workshop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workshop',
      default: null,
    },

    // Artisan beneficiary (for DBT Fair-Trade ledger)
    artisan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      default: null,
    },
    artisanName: {
      type: String,
      trim: true,
    },
    craft: {
      type: String,
      trim: true,
    },
    account: {
      type: String,
      trim: true, // e.g. "SBI •••• 4018"
    },

    // Numerical and formatted amounts
    amount: {
      type: Number,
      default: 0,
    },
    grossAmount: {
      type: String,
      trim: true, // e.g. "₹42,800"
    },
    netPayout: {
      type: String,
      trim: true, // e.g. "₹42,800"
    },
    fairPlatformFee: {
      type: String,
      default: '₹0 (0% SIH Model)',
    },
    payoutMethod: {
      type: String,
      trim: true,
      default: 'Direct DBT / UPI',
    },

    // Transaction ID
    transactionId: {
      type: String,
      trim: true,
      required: [true, 'Transaction ID is required'],
    },

    // Payment status: pending, completed, failed (or Disbursed, Processing)
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'Processing', 'Disbursed', 'Failed', 'On Hold'],
      default: 'completed',
    },
    // Status alias for UI compatibility
    status: {
      type: String,
      default: 'Disbursed',
    },

    isDemoData: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

paymentSchema.pre('save', function (next) {
  if (this.paymentStatus && !this.status) {
    this.status = this.paymentStatus === 'completed' ? 'Disbursed' : this.paymentStatus === 'pending' ? 'Processing' : 'Failed';
  }
  if (!this.grossAmount && this.amount) {
    this.grossAmount = `₹${this.amount.toLocaleString('en-IN')}`;
    this.netPayout = this.grossAmount;
  }
  next();
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
