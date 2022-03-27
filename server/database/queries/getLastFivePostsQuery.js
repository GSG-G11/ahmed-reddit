const connection = require('../config/connection');

module.exports = () => {
  const sqlQuery = {
    text: `SELECT
              p.id,
              p.title,
              p.created_at
            FROM
              posts p
            ORDER BY 
              p.created_at 
            DESC
            LIMIT
              5;`,
  };
  return connection.query(sqlQuery);
};

// LIMIT
// 5
