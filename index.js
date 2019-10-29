const express = require('express');
const routes = require('./routes/routes.js');

const server = express();
server.use(express.json());

server.use('/api/posts', routes);

server.listen(8888, () => console.log("server on 8888"));

