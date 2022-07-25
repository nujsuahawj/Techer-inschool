const validationResult = require('express-validator').validationResult;
const bcrypt = require('bcrypt');
const conn = require('../dbConnection').promise();

exports.register = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        conn.query(query, [name, email, hash], (err, results) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            return res.status(201).json({
                message: 'User created successfully'
            });
        });
    });
};