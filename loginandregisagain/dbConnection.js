const mysql = require('mysql');
const db_connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'odejscrud'
});
// check if connection is successful
db_connection.connect(function (err) {
    if (err) {
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});
module.exports = db_connection;