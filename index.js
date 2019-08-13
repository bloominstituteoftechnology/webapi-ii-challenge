const express = require("express");

const postRouter = require("./data/post-router.js");

const server = express();

server.get('/', (req, res) => {
  res.send(`
    <p>posts project yea</p>
  `);
});

server.use('/api/posts', postRouter);

server.listen(4000, () => {
  console.log('\n*** Server Running on http://localhost:4000 ***\n');
});