const connection = require('../config/connection');

module.exports = () => {
  const sqlQuery = {
    text: `
        SELECT
          p.id,
          p.user_id,
          p.title,
          p.content,
          p.url_image,
          p.created_at,
          COUNT(v.id) AS votes_counts
        FROM
          posts p
          LEFT JOIN votes v
          ON p.id=v.post_id
        GROUP BY
          p.id;
     `,
  };
  return connection.query(sqlQuery);
};
