const { join } = require('path');
const { readFileSync } = require('fs');
const connection = require('../config/connection');

const dbBuild = () => {
  const sql = readFileSync(join(__dirname, '..', 'build/build.sql')).toString();
  return connection.query(sql);
};

module.exports = dbBuild;
