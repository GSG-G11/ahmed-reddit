const connection = require('../config/connection');

module.exports = (id, username, age, urlImage, bio) => {
  const sqlQuery = {
    text: `UPDATE
              users
           SET
              username=$2,
              age=$3,
              url_image=$4,
              bio=$5
           WHERE
              id=$1
           RETURNING *;`,
    values: [id, username, age, urlImage, bio],
  };
  return connection.query(sqlQuery);
};
