const connection = require('../config/connection');

module.exports = (userId) => {
  const sqlQuery = {
    text: `
            SELECT
              u.id,
              u.username,
              u.email,
              u.age,
              u.url_image,
              u.bio,
              (SELECT COUNT(v.id) FROM votes v WHERE v.user_id = u.id) AS vote_counts,
              (SELECT COUNT(c.id) FROM comments c WHERE c.user_id = u.id) AS comment_counts,
              (SELECT COUNT(p.id) FROM posts p WHERE p.user_id = u.id) AS post_counts
            FROM
              users u
            WHERE
              u.id=$1
            GROUP BY
              u.id;`,
    values: [userId],
  };
  return connection.query(sqlQuery);
};
