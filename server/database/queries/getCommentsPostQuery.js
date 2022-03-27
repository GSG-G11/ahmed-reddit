const connection = require('../config/connection');

module.exports = (postId) => {
  const sqlQuery = {
    text: `SELECT
              c.id,
              c.user_id,
              c.content,
              u.username,
              u.url_image AS user_image
              
            FROM
              comments c
              JOIN users u
              ON u.id=c.user_id
            GROUP BY
              c.id,
              user_image,
              u.username
            HAVING 
              c.post_id=$1
            ORDER BY c.id;`,
    values: [postId],
  };
  return connection.query(sqlQuery);
};
