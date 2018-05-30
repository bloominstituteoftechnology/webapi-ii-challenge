const express = require('express');
const cors    = require('cors');

const app  = express();
const db   = require('./data/db.js');
const port = 5000;

app.use(cors());
app.use(express.json());

const error = (res, statusCode, errMessage) => {
  res.status(statusCode).json({ error: errMessage });
}

/********************
** ROUTE: `/posts` **
********************/
// get
app.get('/api/posts', (req, res) => {
  db.find()
    .then(data => res.json(data))
    .catch(err => error(res, 500, "The posts information could not be retrieved."));
});

// post
app.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const post = { title, contents };
  db.insert(post)
    .then(data => {
      if (!title || !contents) {
        return error(400, "Please provide title and contents for the post.");
      }
      res.status(201).json(data);
    })
    .catch(err => error(res, 500, "There was an error while saving the post to the database"));
});

app.listen(port, () => console.log(`Server is listening on PORT: ${ port }`));