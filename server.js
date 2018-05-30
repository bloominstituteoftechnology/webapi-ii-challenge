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

/*************************
** ROUTE: `/posts/api/:id` **
*************************/
// get
app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(data => {
      if (data.length === 0) {
        return error(res, 404, "The post with the specified ID does not exist.");
      }
      res.json(data);
    })
    .catch(err => error(res, 500, "The post information could not be retrieved."));
});

// delete
app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(data => {
      if (data.length === 0) {
        return error(res, 404, "The post with the specified ID does not exist.");
      }
      res.json(data);
    })
    .catch(err => error(res, 500, "The post could not be removed"));
});

// put
app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = { title, contents };
  db.update(id, post)
    .then(data => {
      if (data === 0) {
        return error(res, 404, "The post with the specified ID does not exist.");
      }
      if (title === undefined || contents === undefined) {
        return error(res, 400, "Please provide title and contents for the post.");
      }
      res.json(data);
    })
    .catch(err => error(res, 500, "The post information could not be modified."));
});

app.listen(port, () => console.log(`Server is listening on PORT: ${ port }`));