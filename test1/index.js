const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const { Router } = require('express');
const { response } = require('express');
var app = express();
//Configuring express server
app.use(bodyparser.json());

//MySQL details
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'nodejscrud',
    multipleStatements: true
});

mysqlConnection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Creating GET Router to fetch all the learner details from the MySQL Database
app.get('/learners' , (req, res) => {
    mysqlConnection.query('SELECT * FROM learnerdetails', (err, rows, fields) => {
    if (!err)
    res.send(rows);
    else
    console.log(err);
    })
} );

//Router to GET specific learner detail from the MySQL database
app.get('/learners/:id' , (req, res) => {
    mysqlConnection.query('SELECT * FROM learnerdetails WHERE learner_id = ?',[req.params.id], (err, rows, fields) => {
    if (!err)
        res.send(rows);
    else
    console.log(err);
    })
} );

// insert learner details into the MySQL database
app.post('/learnersaad', (req, res) => {
    
    var query = "INSERT INTO learnerdetails (learner_id, learner_name, learner_email, course_Id)" + "VALUES (?,?,?,?)";
    mysqlConnection.query(query, [req.body.learner_id, req.body.learner_name, req.body.learner_email, req.body.course_Id], (err, rows, fields) => {
        if (!err)
        res.status(200).send({
            message: 'Learner details added successfully'
        })
        else
        console.log(err);
        
    })
} );

// update learner details into the MySQL database
app.put('/learnersup/:id', (req, res) => {
    var query = "UPDATE learnerdetails SET learner_name = ?, learner_email = ?, course_Id = ? WHERE learner_id = ?";
    mysqlConnection.query(query, [req.body.learner_name, req.body.learner_email, req.body.course_Id, req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).send({
            message: 'Learner details updated successfully'
        })
        else
        console.log(err);
    })
} );

// delete learner details into the MySQL database
app.delete('/learnersdel/:id', (req, res) => {
    var query = "DELETE FROM learnerdetails WHERE learner_id = ?";
    mysqlConnection.query(query, [req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).send({
            message: 'Learner details deleted successfully'
        })
        else
        console.log(err);
    })
} );
// deleteall learner details into the MySQL database
app.delete('/learnersdelall', (req, res) => {
    var query = "DELETE FROM learnerdetails";
    mysqlConnection.query(query, (err, rows, fields) => {
        if (!err)
        res.status(200).send({
            message: 'Learner details deleted successfully'
        })
        else
        console.log(err);
    })
} );