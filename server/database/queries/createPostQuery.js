const connection = require('../config/connection');

module.exports = (userId, title, content, urlImage, createdAt) => {
  const sqlQuery = {
    text: `INSERT INTO
              posts (user_id, title, content, url_image, created_at)
           VALUES
              ($1, $2, $3, $4, $5) RETURNING *;`,
    values: [userId, title, content, urlImage, createdAt],
  };
  return connection.query(sqlQuery);
};
