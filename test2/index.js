// create server with express and port 3000
const express = require('express');
const app = express();
const port = 3000;
// connect to mysql database
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'nodejscrud'
});
// check mysql connection
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('DB connected as id ' + connection.threadId);
});

// insert image to database
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

app.post('/api/uploadProfilePic', upload.single('file'), function (req, res, next) {
var imageData = fs.readFileSync(req.file.path);
db.profile.create({
profile_pic: imageData
})
.then(image => {
res.json({ success: true, file1: req.file, data: image, update: false })
})
})

// listen to port 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`));