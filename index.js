require('dotenv').config();
const server = require('./server.js');
PORT = process.env.PORT || 5000;

server.listen(PORT);