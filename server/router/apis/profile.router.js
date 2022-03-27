const express = require('express');
const {
  profileController,
  getUserProfile,
  passwordUpdate,
  getShowUserProfile,
} = require('../../controller');
const { authenticateToken } = require('../../middleware');

const profile = express.Router();

profile.get('/user/:userId/show', getShowUserProfile);

// ---------------- protected ----------------------
profile.use(authenticateToken);
profile.get('/', getUserProfile);
profile.put('/update', profileController);
profile.put('/password/update', passwordUpdate);

module.exports = profile;
