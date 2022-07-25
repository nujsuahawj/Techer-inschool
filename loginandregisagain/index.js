const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));