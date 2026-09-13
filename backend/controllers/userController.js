const User = require('../models/User');
const AppError = require('../utils/AppError');
const { isDBConnected } = require('../config/db');
const demoStore = require('../utils/demoStore');

/** GET /api/users — Admin: list all users */
const getAllUsers = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const filter = {};
      if (req.query.role && req.query.role !== 'All') {
        filter.role = new RegExp(req.query.role, 'i');
      }
      if (req.query.isActive !== undefined) {
        filter.isActive = req.query.isActive === 'true';
      }
      if (req.query.search) {
        const regex = new RegExp(req.query.search, 'i');
        filter.$or = [{ name: regex }, { email: regex }, { location: regex }, { phone: regex }];
      }

      const users = await User.find(filter).sort({ createdAt: -1 });
      return res.json({
        success: true,
        count: users.length,
        isLiveDatabase: true,
        data: users,
      });
    }

    // Offline Demo Mode
    const users = demoStore.getUsers(req.query);
    res.json({
      success: true,
      count: users.length,
      isLiveDatabase: false,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/** GET /api/users/:id — Get a single user */
const getUserById = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const user = await User.findById(req.params.id);
      if (!user) return next(new AppError('User not found.', 404));
      return res.json({ success: true, isLiveDatabase: true, data: user });
    }

    // Offline Demo Mode
    const user = demoStore.getUserById(req.params.id);
    if (!user) return next(new AppError('User not found.', 404));
    res.json({ success: true, isLiveDatabase: false, data: user });
  } catch (error) {
    next(error);
  }
};

/** PUT /api/users/:id & PATCH /api/users/:id — Admin: update user */
const updateUser = async (req, res, next) => {
  try {
    delete req.body.password; // Don't allow password overwriting here

    if (isDBConnected()) {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!user) return next(new AppError('User not found.', 404));
      return res.json({
        success: true,
        message: 'User updated successfully.',
        isLiveDatabase: true,
        data: user,
      });
    }

    // Offline Demo Mode
    const user = demoStore.updateUser(req.params.id, req.body);
    if (!user) return next(new AppError('User not found.', 404));
    res.json({
      success: true,
      message: 'User updated successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

/** DELETE /api/users/:id — Admin: delete a user */
const deleteUser = async (req, res, next) => {
  try {
    if (isDBConnected()) {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return next(new AppError('User not found.', 404));
      return res.json({
        success: true,
        message: 'User removed successfully.',
        isLiveDatabase: true,
      });
    }

    // Offline Demo Mode
    const deleted = demoStore.deleteUser(req.params.id);
    if (!deleted) return next(new AppError('User not found.', 404));
    res.json({
      success: true,
      message: 'User removed successfully. (Offline Demo Mode)',
      isLiveDatabase: false,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
