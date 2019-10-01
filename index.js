// implement your API here
const express = require('express'); //equivalent to importing in REACT.
const postsRouter = require('./posts/posts-router.js');
const server = express();

server.use(express.json()); //Need this for post and put, allows server to read JSON.

server.use('/api/posts', postsRouter)

server.get('/', (req, res)=>{
    res.send(`
    <h2>Project 2 Posts API</h>
    <p>Welcome to my Posts Project 2!</p>
    `);
})
const port = 5555;
server.listen(port, ()=> console.log(`\nAPI on ${port}\n`))