const connection = require('../config/connection');

const deleteUserGamesQuery = (commentId, userId) => {
  const sql = {
    text: `DELETE
            FROM
              comments
            WHERE
              id=$1
              AND user_id=$2 
              RETURNING *;`,
    values: [commentId, userId],
  };
  return connection.query(sql);
};

module.exports = deleteUserGamesQuery;
