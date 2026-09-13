const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
      select: false, // never return password in queries by default
    },
    role: {
      type: String,
      enum: ['learner', 'artisan', 'admin'],
      default: 'learner',
    },
    phone: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String, // URL to profile image
      default: null,
    },
    location: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // For artisan users — links to their Artisan profile
    artisanProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artisan',
      default: null,
    },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// Hash the password before saving (only if password was changed)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  // 12 salt rounds is a good balance of security and speed
  this.password = await bcrypt.hash(this.password, 12);
});

// Method to check if a given password matches the stored hash
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
