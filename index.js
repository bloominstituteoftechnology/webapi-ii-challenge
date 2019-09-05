require('dotenv').config()
const express = require('express');
const postRouter = require('./Posts/postsRoutes')
const server = express();
const defaults = require('./config/defaults.js')
const secrets = require('./config/secrets.js')

console.log('environment', secrets.environment);

server.use(express.json())
server.use('/api/posts', postRouter)
server.listen(defaults.port, () => console.log(`\n***Server Running on http://localhost:${defaults.port} ***\n`));