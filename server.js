// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');
const { respondWithError } = require('./utils');
const { DATABASE_RETRIEVAL_ERROR, NOT_FOUND_ERROR } = require('./Errors');

const app = express();

app.use(helmet());
app.use(morgan('development'));
app.use(express.json());

// add your server code starting here

// get
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.json(posts);
  } catch (error) {
    respondWithError(res, DATABASE_RETRIEVAL_ERROR);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const {
      params: { id },
    } = req;

    const post = await db.findById(id);

    if (!post.length) throw NOT_FOUND_ERROR;

    res.json(post);
  } catch (error) {
    switch (error) {
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, DATABASE_RETRIEVAL_ERROR);
    }
  }
});

app.listen(3000);
