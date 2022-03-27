const connection = require('../config/connection');

module.exports = () => {
  const sqlQuery = {
    text: `SELECT
              p.id,
              p.user_id,
              u.url_image AS user_image,
              u.username,
              p.title,
              p.content,
              p.url_image,
              p.created_at,
              (SELECT SUM(v.vote_number) FROM votes v WHERE v.post_id = p.id) AS votes_counts,
              (SELECT Count(c.id) FROM comments c WHERE c.post_id = p.id) AS comments_counts
            FROM
              posts p
              JOIN users u
              ON u.id=p.user_id
            GROUP BY
              p.id,
              user_image,
              u.username
            ORDER BY p.id;`,
  };
  return connection.query(sqlQuery);
};
