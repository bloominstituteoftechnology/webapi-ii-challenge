const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db');

const server = express();

server.listen(5000, () => {
    console.log('===SERVER RUNNING ON PORT 5000');
})

