const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 4000;
const postsRouter = require('./posts/postsRouter');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json('API UP');
});

app.use('/api/posts', postsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
