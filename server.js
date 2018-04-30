// import your node modules
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

import db from './data/db';
import { validateBody, respondWithError } from './utils';
import { DATABASE_RETRIEVAL_ERROR, NOT_FOUND_ERROR, INPUT_ERROR, REMOVE_ERROR, PUT_ERROR } from './Errors';

// add your server code starting here
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

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

// post
app.post('/api/posts', async (req, res) => {
  const { body } = req;
  try {
    if (!validateBody(body)) throw INPUT_ERROR;
    const response = await db.insert(body);
    res.status(201).json(response);
  } catch (error) {
    switch (error) {
      case INPUT_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, DATABASE_RETRIEVAL_ERROR);
    }
  }
});

// delete
app.delete('/api/posts/:id', async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const response = await db.remove(id);
    if (response === 0) throw NOT_FOUND_ERROR;
    res.json(response);
  } catch (error) {
    switch (error) {
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, REMOVE_ERROR);
    }
  }
});

// put
app.put('/api/posts/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;
    if (!validateBody(body)) throw INPUT_ERROR;
    const response = await db.update(id, body);

    if (Number(response) === 0) throw NOT_FOUND_ERROR;

    const updatedPost = await db.findById(id);

    res.json(updatedPost);
  } catch (error) {
    switch (error) {
      case INPUT_ERROR:
        respondWithError(res, error);
        break;
      case NOT_FOUND_ERROR:
        respondWithError(res, error);
        break;
      default:
        respondWithError(res, PUT_ERROR);
    }
  }
});

const port = 5000;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));

