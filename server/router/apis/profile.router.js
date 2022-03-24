const express = require('express');
const {
  profileController,
  getUserProfile

} = require('../../controller');


const profile = express.Router();

profile.get('/', getUserProfile);
profile.put('/update', profileController);




module.exports = profile;
