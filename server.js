// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

// add your server code starting here

server.use(express.json());

server.get('/posts', (req, res) => {
  db.find().then(posts => {
    res.status(200).json(posts)
  }).catch(err => {
    console.error('error', err);

    res.status(500).json({ message: 'The posts information could not be retrieved.'})
  })
});

server.get('/posts/:id', (req, res) => {
  db.findById(parseInt(req.params.id)).then(post => {
    console.log(post);
    if (post.length === 0) {
      res.status(404).json({  message: 'The post with the specified ID does not exist.' });
    }
    else {
      res.status(200).json(post)
  }}).catch(err => {
    console.error('error', err);

    res.status(500).json({ error: 'The post information could not be retrieved.'})
  })
});

server.post('/posts', (req, res) => {
  console.log(req.body);
  const newPost = req.body;
  if (newPost.title && newPost.contents) {
    db.insert(newPost).then(id => {
      console.log(id);
      res.status(201).json({ message: 'Post created successfully!'})
    }).catch(err => {
      res.status(500).json({ message: 'There was an error adding your post'})
    });
  }
  else {
    res.status(422).json({ message: 'A post needs both a title as well as post contents to be saved'});
  }
})

server.delete('/posts/:id', (req, res) => {
  db.remove(req.params.id).then(count => {
    console.log(count);
    res.status(204).end();
  }).catch(err => {
    res.status(500).json(err);
  })
})

server.put('/posts/:id', (req, res) => {
  if (req.body.title && req.body.contents) {
    db.update(req.params.id, req.body).then(count => {
      res.status(201).json({ message: 'Your post was updated successfully'})
    }).catch(err => {
      res.status(500).json(err)
    })
  }
  else {
    res.status(422).json({ message: 'A post must have a title and post contents to save'})
  }
})

server.listen(3000, ()=>console.log('Hello!'))
