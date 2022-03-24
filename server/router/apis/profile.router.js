const express = require('express');
const {
  profileController,
  getUserProfile,
  passwordUpdate

} = require('../../controller');


const profile = express.Router();

profile.get('/', getUserProfile);
profile.put('/update', profileController);
profile.put('/password/update', passwordUpdate);




module.exports = profile;
