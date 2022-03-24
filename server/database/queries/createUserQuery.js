const connection = require('../config/connection');

module.exports = (username, email, password) => {
  const sqlQuery = {
    text: `INSERT INTO
           users (username,email,password) 
           VALUES ($1,$2,$3) 
           RETURNING *;`,
    values: [username, email, password],
  };
  return connection.query(sqlQuery);
};
