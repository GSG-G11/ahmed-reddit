const connection = require('../config/connection');

module.exports = (query) => {
  const sqlQuery = {
    text: `SELECT
              p.id,
              p.user_id,
              p.title,
              p.content,
              p.url_image,
              p.created_at
            FROM
              posts p
            WHERE 
               p.title 
            LIKE $1
            OR
              p.content 
            LIKE $1
            ORDER BY p.id;`,
    values: [query],
  };
  return connection.query(sqlQuery);
};
