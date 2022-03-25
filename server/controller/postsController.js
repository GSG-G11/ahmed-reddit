/* eslint-disable prefer-destructuring */
const { join } = require('path');

module.exports = {
  getPostsPage: (_, res, next) => {
    try {
      res
        .status(301)
        .sendFile(join(__dirname, '..', '..', 'public', 'views', 'posts.html'));
    } catch (err) {
      next('SERVER ERROR');
    }
  },

  getAllPosts: (_, res, next) => {
    res.status(200).json({ status: 200, data: 'done' });
  },
};
