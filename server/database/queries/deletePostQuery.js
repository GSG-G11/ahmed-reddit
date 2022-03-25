const connection = require('../config/connection');

const deleteUserGamesQuery = (postId, userId) => {
  const sql = {
    text: `DELETE
            FROM
              posts
            WHERE
              id=$1
              AND user_id=$2 
              RETURNING *;`,
    values: [postId, userId],
  };
  return connection.query(sql);
};

module.exports = deleteUserGamesQuery;
