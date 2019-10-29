const express = require('express')

const server = express();

server.use(express.json());

server.get('/', (res, req) => {
     res.send('Hello this is my API')
})

server.listen(8000,() => {
     console.log('Sever is running on port 8000')
})