const connection = require('../config/connection');

module.exports = (postId) => {
  const sqlQuery = {
    text: `SELECT
              p.*,
              (SELECT SUM(v.vote_number) FROM votes v WHERE v.post_id = p.id) AS votes_counts
            FROM
              posts p
            WHERE
              p.id=$1;`,
    values: [postId],
  };
  return connection.query(sqlQuery);
};
