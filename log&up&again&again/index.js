
// connectmysql and express and port 3000
var mysql = require('mysql');
var express = require('express');
var app = express();
var port = 3000;
app.listen(port, function() {
    console.log('Listening on port ' + port);
});
