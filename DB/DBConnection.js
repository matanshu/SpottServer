require('dotenv').config();
const { createConnection } = require('mysql2');

// const conn = createConnection({
//   host: process.env.tedious_host,
//   user: process.env.tedious_user,
//   password: process.env.tedious_password,
//   database: process.env.tedious_database,
// });

// const conn = createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '12345678',
//   database: 'test',
// });

const conn = createConnection({
  host: 'bkditozzrjsi8hsuxr0v-mysql.services.clever-cloud.com',
  user: 'u5aw1wt8zrtawffv',
  password: 'kK8CAPD4msLTXiEPOBVH',
  database: 'bkditozzrjsi8hsuxr0v',
});

module.exports = conn;
