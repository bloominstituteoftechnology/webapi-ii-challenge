// import your node modules
import express from 'express';
import morgan from 'morgan'; // logs client requests; a logger
import helmet from 'helmet'; // header formater

import db from './data/db';
import { validateBody, respondWithError } from './utils';
import { NOT_FOUND_ERROR, INPUT_ERROR, REMOVE_ERROR, PUT_ERROR } from './Errors';

// add your server code starting here
const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

// allow cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// get
// async await
// https://javascript.info/async-await
app.get('/api/posts', async (req, res) => {
  try {
    // db.find().then(posts=>res.json(posts))
    const posts = await db.find();
    res.json(posts);
  } catch (e) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;

    // async await
    // https://javascript.info/async-await
    const post = await db.findById(id); // returns id array

    if (!post.length) respondWithError(res, NOT_FOUND_ERROR); // error for post being an empty array

    res.json(post);
  } catch (error) {
    respondWithError(res);
  }
});

// post
app.post('/api/posts', async (req, res) => {
  const { body } = req;
  try {
    if (!validateBody(body)) {
      respondWithError(INPUT_ERROR);
      return;
    }

    // db.insert(body)
    const response = await db.insert(body);

    // .then(response=>res.status(201).json(response))
    res.status(201).json(response);
  } catch (error) {
    // .catch(()=>respondWithError(res))
    respondWithError(res);
  }
});

// delete
app.delete('/api/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const response = await db.remove(id);
    if (response === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }
    res.json(response);
  } catch (error) {
    respondWithError(res, REMOVE_ERROR);
  }
});

// put
app.put('/api/posts/:id', async (req, res) => {
  try {
    const {
      params: { id },
      body,
    } = req;

    if (!validateBody(body)) {
      respondWithError(res, INPUT_ERROR);
      return;
    }

    const response = await db.update(id, body);

    if (Number(response) === 0) {
      respondWithError(res, NOT_FOUND_ERROR);
      return;
    }

    const updatedPost = await db.findById(id);

    res.json(updatedPost);
  } catch (error) {
    respondWithError(res, PUT_ERROR);
  }
});

const port = 5000;

/*eslint-disable */
app.listen(port, () => console.log(`server running on http://localhost:${port}`));
