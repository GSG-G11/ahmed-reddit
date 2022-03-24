const connection = require('../config/connection');

module.exports = (id, password) => {
  const sqlQuery = {
    text: `UPDATE
            users
         SET
            password=$2
         WHERE
            id=$1
         RETURNING 
            id,
            username
            email,
            age,
            url_image,
            bio;`,
    values: [id, password],
  };
  return connection.query(sqlQuery);
};
