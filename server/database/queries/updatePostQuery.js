const connection = require('../config/connection');

module.exports = (postId, userId, title, content,urlImage) => {
  const sqlQuery = {
    text: `UPDATE
              posts
           SET
              title=$3,
              content=$4,
              url_image=$5
           WHERE
              id=$1
              AND user_id=$2
              RETURNING *;`,
    values: [postId, userId,title, content,urlImage],
  };
  return connection.query(sqlQuery);
};
