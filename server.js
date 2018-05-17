const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log('===SERVER RUNNING ON PORT 5000===');
})

server.use(helmet());
server.use(cors());
server.use(express.json());

// okay now, just like in the lecture video, let's make our server routes:

server.get('/', (req, res) => {
    res.send('<h2>GET REQUEST RECEIVED</h2>');
})

server.get('/api/posts', (req, res) => {

})