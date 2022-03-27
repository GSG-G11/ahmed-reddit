const connection = require('../config/connection');
//  check this
module.exports = (postId) => {
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
              (SELECT Count(v.id) FROM votes v WHERE v.post_id = p.id) AS votes_counts,
              (SELECT Count(c.id) FROM comments c WHERE c.post_id = p.id) AS comments_counts
          FROM
            posts p
          JOIN users u
          ON u.id=p.user_id
          GROUP BY
            p.id,
            user_image, 
            u.username
          HAVING 
            p.id=$1;`,
    values: [postId],
  };
  return connection.query(sqlQuery);
};
