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
              COUNT(p.id) AS post_counts,
              COUNT(c.id) AS comment_counts,
              COUNT(v.id) AS vote_counts
            FROM
              users u
            LEFT JOIN posts p
            ON u.id = p.user_id
            LEFT JOIN comments c
            ON u.id = c.user_id
            LEFT JOIN votes v
            ON u.id = v.user_id
            WHERE
              u.id=$1
            GROUP BY
              u.id;`,
    values: [userId],
  };
  return connection.query(sqlQuery);
};
