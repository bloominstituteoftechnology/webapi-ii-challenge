const express = require('express');

const PostRouter = require('./post-router.js');

const server = express();

server.use(express.json());

server.use('/api/posts', PostRouter);

server.listen(9000, () => {
    console.log('\n*** Server Running on http://localhost:9000 ***\n');
  });
  