const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: '9423',
  host: 'localhost',
  port: 5432,
  database: 'clyde_challenge',
});

module.exports = pool;
