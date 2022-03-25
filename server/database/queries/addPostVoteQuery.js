const connection = require('../config/connection');

module.exports = (postId, userId, voteNumber) => {
  const sqlQuery = {
    text: `INSERT INTO
              votes (post_id, user_id, vote_number)
           VALUES
              ($1, $2, $3) RETURNING *;`,
    values: [postId, userId, voteNumber],
  };
  return connection.query(sqlQuery);
};
