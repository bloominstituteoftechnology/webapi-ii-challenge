require('dotenv').config()

const express = require('express')
const server = express();
const postsRouter = require('./posts/postsRouter.js')

server.use(express.json());
server.use('/api/posts', postsRouter)


server.get('/', (req,res) => {
     res.status(200).json({message: process.env.MSG})
})

const port = process.env.PORT 
console.log(process.env.MSG)
console.log(process.env.PORT)
console.log(port)

server.listen(port,() => {
     console.log(`Sever is running on port ${port}`)
})

