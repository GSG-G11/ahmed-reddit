const express = require('express');
const {
  getAllPosts

} = require('../../controller');


const posts = express.Router();

posts.get('/', getAllPosts);





module.exports = posts;
