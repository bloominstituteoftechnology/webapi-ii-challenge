const express = require('express')
const dataRouter = require('./data/data-router')

const server = express();

server.use(express.json());

server.use('/api', dataRouter)

// CRUD requests
server.get('/', (req, res) => {
    res.status(200).json({ message: "hello"})
})

const port = 5000;
server.listen(port, () => ({message: 'server on port 5000'}))

