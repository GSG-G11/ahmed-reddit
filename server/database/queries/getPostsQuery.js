const connection = require('../config/connection');

module.exports = () => {
  const sqlQuery = {
    text: `SELECT
              p.id,
              u.url_image AS user_image,
              u.username,
              p.title,
              p.content,
              p.url_image,
              p.created_at,
              SUM(v.vote_number) AS votes_counts,
              COUNT(c.id) AS comments_counts
            FROM
              posts p
              JOIN users u
              ON u.id=p.user_id
              LEFT JOIN votes v
              ON p.id=v.post_id
              LEFT JOIN comments c
              ON p.id = c.post_id
            GROUP BY
              p.id,
              u.url_image,
              u.username;`,
  };
  return connection.query(sqlQuery);
};
