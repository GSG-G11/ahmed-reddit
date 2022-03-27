const connection = require('../config/connection');

module.exports = (postId, userId, content) => {
  const sqlQuery = {
    text: `INSERT INTO
              comments (post_id, user_id, content)
           VALUES
              ($1, $2, $3) RETURNING *;`,
    values: [postId, userId, content],
  };
  return connection.query(sqlQuery);
};


