const jwt = require('jsonwebtoken');
const conn = require('../dbConnection');
exports.getUser = (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, 'secret');
    const query = 'SELECT * FROM users WHERE id = ?';
    conn.query(query, [decoded.userId], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err
            });
        }
        return res.status(200).json({
            message: 'Auth successful',
            user: results[0]
        });
    });
}