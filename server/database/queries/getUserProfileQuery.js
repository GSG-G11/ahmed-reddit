const connection = require('../config/connection');

module.exports = (userId) => {
  const sqlQuery = {
    text: `
    SELECT
      id,
      username,
      email,
      age,
      url_image,
      bio
    FROM
      users
    WHERE
      id=$1;
     `,
    values: [userId],
  };
  return connection.query(sqlQuery);
};
