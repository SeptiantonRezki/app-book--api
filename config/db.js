const mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_user",
});


// const connection = mysql.createPool({
//   user: process.env.CLOUD_SQL_USERNAME,
//   password: process.env.CLOUD_SQL_PASSWORD,
//   database: process.env.CLOUD_SQL_DATABASE_NAME,
//   socketPath: `/cloudsql/${process.env.CLOUD_SQL_CONNECTION_NAME}`,
// });

module.exports = connection;
