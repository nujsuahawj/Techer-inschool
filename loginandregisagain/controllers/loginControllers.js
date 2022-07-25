const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const validationResult = require('express-validator').validationResult;
const conn = require('../dbConnection');
exports.login = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    conn.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        if (results.length === 0) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(password, results[0].password, (err, bcryptRes) => {
            if (err) {
                return res.status(500).json({
                    error: err
                });
            }
            if (!bcryptRes) {
                return res.status(401).json({
                    message: 'Auth failed'
                });
            }
            const token = jwt.sign({
                email: results[0].email,
                userId: results[0].id
            }, 'secret', { expiresIn: '1h' });
            return res.status(200).json({
                message: 'Auth successful',
                token: token
            });
        });
    });
};