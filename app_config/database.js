const { createPool } = require("mysql");

// const pool = createPool({
//   port: 3306,
//   host: "localhost",
//   user: "rentochcom_abeni",
//   password: "y]~eHw@E*b$%",
//   database: "rentochcom_food_menu",
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