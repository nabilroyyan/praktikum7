let mysql = require("mysql"); // import libary mysqli

let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "praktikum7",
});

connection.connect(function (error) {
  if (!error) {
    console.log("berhasil");
  } else {
    console.log("koneksi eror");
  }
});

module.exports = connection;
