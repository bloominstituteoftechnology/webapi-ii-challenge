// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const cors = require('cors');

const port = 8000;

server.use(cors());

// add your server code starting here

server.get('/', (req, res) => { //request/route handler
res.send('Hello Chris');
});

server.get('/api/posts', (req, res) =>{
  db.find().then(posts => {
      res.json(posts);
  }).catch(err => res.send(err))
});

server.get('/api/contact', (req, res) => {
  res
    .status(200)
    .send('<div><h1>Contact</h1><input placeholder="email" /></div>');
});

server.use(express.json());
 server.get('/api/posts', (req, res) => {
  db.find()
    .then((posts) => {
      console.log('** posts **', posts);
      res.json(posts);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .json({ error: 'Information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {
const id = req.params.id;
db.findById(id)
  .then((post) => {
    if (post) {
      res.status(200).json({ post });
    } else {
      res
        .status(404)
        .json({ message: 'Specified ID does not exist.' });
    }
  })
  .catch((err) => {
    console.log(err);
    res
      .status(500)
      .json({ error: 'Information could not be retrieved.' });
  });
});

server.post('/api/posts', (req, res) => {
console.log(req.body);
const { title, contents } = req.body;
if (!title || !contents) {
  return res.status(400).send({
    errorMessage: 'Provide title and contents for the post.',
  });
}
const newPost = { title, contents };
db.insert(newPost)
  .then((postId) => {
    const { id } = postId;
    db.findById(id).then((post) => {
      console.log(post);
      if (!post) {
        return res.status(400).send({
          errorMessage: 'Provide title and contents for the post.',
        });
      }
      res.status(201).json(post);
   });
 })
 .catch((err) => {
   console.log(err);
   res.status(500).json({
     error: 'Could not save the post to the database',
   });
 });
});

server.delete('/api/posts/:id', (req, res) => {
const { id } = req.params;
db.remove(id)
    .then((removedPost) => {
    console.log(removedPost);
    if (!removedPost) {
      return res.status(404).send({
        message: 'That specified ID does not exist.',
      });
    }
    res.status(200).json(removedPost);
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: 'Post could not be removed',
    });
  });
});

server.put('/api/posts/:id', (req, res) => {
const { id } = req.params;
const { title, contents } = req.body;
if (!title || !contents) {
  return res.status(400).send({
    errorMessage: 'Provide title and contents for the post.',
  });
}
const newPost = { title, contents };
console.log('newPost', newPost);
db.update(id, newPost)
  .then((post) => {
    console.log('post', post);
    if (!post) {
      return res.status(404).send({
        message: 'ID does not exist.',
      });
    }
    res.status(200).json(newPost);
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Information could not be modified.',
    });
  });
});

server.listen(port, () => console.log(`===API running on port ${port}===`));
//  server.listen(port, (err) => {
//   if (err) console.log(err);
//   console.log(`===listening on port ${port}===`);
// });
