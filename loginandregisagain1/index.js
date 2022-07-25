const express = require('express');
// inport the database connection
const conn = require('./dbConnection');
// inport router 
const router = require('express').Router();
const body = require('express-validator');
const register = require('../controllers/registerController');

app.use(routes);
app.use(express.json());

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    res.status(err.statusCode).json({
      message: err.message,
    });
});
app.post('/register',[
    body('name',"The name must be of minimum 3 characters length")
    .notEmpty()
    .escape()
    .trim()
    .isLength({ min: 3 }),
    body('email',"Invalid email address")
    .notEmpty()
    .escape()
    .trim().isEmail(),
    body('password',"The Password must be of minimum 4 characters length").notEmpty().trim().isLength({ min: 4 }),
], register);
// http://localhost:3000/register
app.listen(3000,() => console.log('Server is running on port 3000'));