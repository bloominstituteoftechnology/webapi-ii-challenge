const express = require('express');
require('dotenv').config();

const port = process.env.PORT || 4000;
const postsRouter = require('./routes/postsRouter');
const commentsRouter = require('./routes/commentsRouter');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <h2>welcome to this app</h2>
  `);
});

app.use('/api/posts', postsRouter);
app.use('/api/posts/:id/comments', commentsRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
