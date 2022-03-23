const connection = require('../config/connection');

module.exports = (email) => {
  const sqlQuery = {
    text: 'SELECT id , password, username FROM users WHERE email = $1;',
    values: [email],
  };
  return connection.query(sqlQuery);
};
