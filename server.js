const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const PORT = 3030;
const STATUS_USER_ERROR = 422;
const STATUS_SUCCESS = 200;

const server = express();

server.listen(PORT);
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send(
        '<p>Hello Troy!</p>'+
        '<p>The fun stuff is at /posts</p>'
    );
});


