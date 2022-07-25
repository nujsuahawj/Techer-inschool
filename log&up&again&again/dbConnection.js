const mysql = require("mysql");

const db_connection = mysql
  .createConnection({
    host: "localhost", 
    user: "root", 
    database: "nodejscrud", 
    password: "mysql", 
  })
// check if connection is successful
db_connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + db_connection.threadId);
});

module.exports = db_connection;