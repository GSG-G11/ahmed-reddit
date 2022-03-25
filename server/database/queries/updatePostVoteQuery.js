const connection = require('../config/connection');

module.exports = (id, userId, postId, voteNumber) => {
  const sqlQuery = {
    text: `UPDATE
              votes
           SET
              vote_number=$4
           WHERE
              id=$1
              AND user_id=$2
              AND post_id=$3 RETURNING *;`,
    values: [id, userId, postId, voteNumber],
  };
  return connection.query(sqlQuery);
};
