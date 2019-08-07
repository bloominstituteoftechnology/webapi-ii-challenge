const express = require('express')
const Router = require('./user/routers')
const Comments = require('./user/commentRouter')
const port = 5000
const server = express();

server.use(express.json());
server.use('/api/posts', Router);
server.use('/api/posts', Comments);
server.listen(port, ()=>console.log('your are connected'))