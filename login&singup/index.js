// url: https://www.w3jar.com/node-js-login-registration-rest-api-mysql-db/

const express = require('express');
const routes = require('./routes');
const app = express();

app.use(express.json());
app.use(routes);

app.use((req, res, next) => {
    res.status(404).json({
        message: 'Not found'
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});