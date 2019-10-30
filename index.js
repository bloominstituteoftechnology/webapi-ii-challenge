const express = require('express');

const postsRouter = require('./data/posts/posts-router.js');

const server = express();

server.use(express.json());


server.get('/', (req, res) => {
   res.send(`
     <h2>Lambda posts API</h>
     <p>Welcome to the API</p>
   `);
 });


 server.use('/api/posts', postsRouter);

 server.listen(4000, () => {
   console.log('\n*** Server Running on http://localhost:4000 ***\n');
 });