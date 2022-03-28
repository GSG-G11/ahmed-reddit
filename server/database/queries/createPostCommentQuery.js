const connection = require('../config/connection');

module.exports = (postId, userId, content, createdAt) => {
  const sqlQuery = {
    text: `INSERT INTO
              comments (post_id, user_id, content,created_at)
           VALUES
              ($1, $2, $3,$4) RETURNING *;`,
    values: [postId, userId, content, createdAt],
  };
  return connection.query(sqlQuery);
};
