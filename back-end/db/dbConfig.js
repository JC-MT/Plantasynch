// http://vitaly-t.github.io/pg-promise/module-pg-promise.html
const pgp = require('pg-promise')();
require('dotenv').config();
const { DATABASE_URL, PG_HOST, PG_PORT, PG_DATABASE, PG_USER } = process.env;

// https://github.com/vitaly-t/pg-promise/wiki/Connection-Syntax#configuration-object
const cn = DATABASE_URL
  ? {
      connectionString: DATABASE_URL,
      max: 5,
      ssl: {
        rejectUnauthorized: false
      }
    }
  : {
      host: PG_HOST,
      port: PG_PORT,
      database: PG_DATABASE,
      user: PG_USER
    };

const db = pgp(cn);

module.exports = db;
