const { Pool } = require('pg');
const { URL, SSL } = require('./config.connection');

const connection = new Pool({
  connectionString: URL,
  ssl: SSL,
});

module.exports = connection;
