const connection = require('../config/connection');

module.exports = () => {
  const sqlQuery = {
    text: `SELECT
              p.id,
              p.title,
              p.created_at,
              SUM(v.vote_number) AS votes_counts
            FROM
              posts p
            LEFT JOIN 
              votes v
            ON 
              p.id=v.post_id
            GROUP BY
              p.id
            ORDER BY 
              votes_counts
            DESC
            LIMIT
              5;`,
  };
  return connection.query(sqlQuery);
};

// LIMIT
// 5
