const connection = require('../config/connection');

module.exports = (postId) => {
  const sqlQuery = {
    text: `
            SELECT
            *
            FROM
              posts
            WHERE
              id=$1;
            `,
    values: [postId],
  };
  return connection.query(sqlQuery);
};
