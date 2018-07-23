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

app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
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

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let cached;
  db.findById(id)
    .then(post => {
      cached = post;
    })
    .catch(err => {
      console.log(err);
    });
  db.remove(id)
    .then(() => {
      res.status(200).json({ post: cached });
    })
    .call(err => {
      console.log(err);
      res.status(400).json({ error: 'Something went wrong deleting the post' });
    });
});

app.put('/api/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;

  const post = {
    title,
    contents
  };

  if (!title || !contents) {
    return res
      .status(400)
      .error('Please provide title and contents for the post');
  }
  db.update(id, post)
    .then(count => {
      if (count === 1) {
        res.status(200).json({ success: 'Post successfully updated' });
      } else {
        res.status(500).json({ failed: 'Something went wrong' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ error: 'There was an error updating the post' });
    });
});

app.listen(8000, () => {
  console.log('Listening for traffic on PORT 8000');
});
