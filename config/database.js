const { createPool } = require("mysql");

// const pool = createPool({
//   port: 3306,
//   host: "localhost",
//   user: "rentochcom_aseraruser",
//   password: "uH-y,Opx0Z6@",
//   database: "rentochcom_aserar",
//   connectTimeout: 10,
// });
// for local
const pool = createPool({
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
  database: "aserar",
  connectTimeout: 10,
});

module.exports = pool;