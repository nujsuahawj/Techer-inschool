const mysql = require("mysql");

const db_connection = mysql
  .createConnection({
    host: "localhost", 
    user: "root", 
    database: "nodejscrud", 
    password: "mysql",
  })
    .connect((err) => {
        if (err) {
            console.log("Error connecting to database");
        }
        console.log("Connected to database");
    }
    );

module.exports = db_connection;