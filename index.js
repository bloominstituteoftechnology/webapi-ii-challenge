const express = require('express')
const Router = require('./user/routers')
const port = 5000
const server = express();

server.use(express.json());
server.use('/api/posts', Router);

server.listen(port, ()=>console.log('your are connected'))