const connection = require('../config/connection');

module.exports = (userId, postId) => {
  const sqlQuery = {
    text: `SELECT
              *
            FROM
              votes
            WHERE
              user_id=$1
              AND post_id=$2;`,
    values: [userId, postId],
  };
  return connection.query(sqlQuery);
};
