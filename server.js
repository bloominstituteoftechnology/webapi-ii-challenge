const bodyParser = require('body-parser');
const express = require('express');

const server = express();
const PORT = 3030;

server.listen(PORT);

server.get('/', (req, res) => {
    res.send('Hello Troy!');
});


