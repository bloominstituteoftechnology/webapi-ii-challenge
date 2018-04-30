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


const port = 5000;
app.listen(port, () => console.log(`server running on http://localhost:${port}`));

