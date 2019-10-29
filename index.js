const express = require('express')

const server = express();
const postsRouter = require('./posts/postsRouter.js')

server.use(express.json());

server.get('/', (res, req)=> {
     res.send('Hello this is my API')
})

server.use('/api/posts', postsRouter)

server.listen(4000,() => {
     console.log('Sever is running on port 4000')
})