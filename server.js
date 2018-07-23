// import your node modules
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./data/db.js');

// add your app code starting here

app.get('/', (req, res) => {
  res.json({ message: 'Stay golden, Pony Boy' });
});

app.post('/api/posts', (req, res) => {
  if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ error: 'Please provide title and contents for the post' });
  }
  const post = {
    title: req.body.title,
    contents: req.body.contents
  };
  db.insert(post)
    .then(id => {
      res.status(200).json({ id });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      });
    });
});

app.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json({ posts });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'There was an error retrieving posts' });
    });
});

app.get('/api/posts/:id', async (req, res) => {
  const { id } = req.body;
  db.findById(id)
    .then(post => {
      res.status(200).json({ post });
    })
    .catch(err => {
      console.log(err);
      res
        .status(400)
        .json({ error: 'There was an error retrieving this post' });
    });
});

app.delete('/api/post/:id', (req, res) => {
  const { id } = req.body;
  if (!req.body.id) {
    res.status(400).json({ error: 'Please provide an ID for deletion ' });
  }
  db.remove(id).then(() => {
    res.status(200).json({ success: 'Post successfully deleted' });
  });
});

app.put('/api/posts/:id', (req, res) => {
  const post = req.body;
  const { id } = req.body;
  db.update(id, post);
  const updated = db.findById(id);
  res.json({ post: updated });
});

app.listen(8000, () => {
  console.log('Listening for traffic on PORT 8000');
});
