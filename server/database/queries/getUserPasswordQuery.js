const connection = require('../config/connection');

module.exports = (userId) => {
  const sqlQuery = {
    text: `
    SELECT
     password
    FROM
      users
    WHERE
      id=$1;
     `,
    values: [userId],
  };
  return connection.query(sqlQuery);
};
