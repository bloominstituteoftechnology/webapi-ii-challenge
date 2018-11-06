// import your node modules

const db = require('./data/db.js');

// add your server code starting here
const express = require('express');

const server = express();

server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      res.status(200).json(posts);
  })
  .catch( error => {
    res
      .status(500)
      .json({error: "The posts information could not be retrieved.", error: error});
  });
});

server.get('/api/post/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({ message: "The post with the specified ID does not exist."})
    })
    .catch( error => {
      res.status(500).json({error: "The post information could not be retrieved.", error: error})
    })
})

server.post('/api/posts', async (req, res) => {
  try{
    const postData = req.body;
    const postId = await db.insert(postData);
    const post =  await db.findById(postId.id);
    res.status(201).json(post);
  } catch (error) {
    let message = 'There was an error while saving the post to the database'
    (error.errno === 19)
      ? message = "Please provide title and contents for the post."
      : res.status(500).json({ message, error})
  }
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
  .then((count) => {
    count
      ? res.status(200).json({ message: 'Post updated successfully' })
      : res.status(404).json({ message: 'That post was not found or already updated' });
  })
  .catch((error) => {
    res.status(500).json({ message: 'error updating post', error });
  });
});



  server.delete('/api/posts/:id', (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        count
          ? res.status(200).json(count) 
          : res.status(404).json({ message: "The post with the specified ID does not exist."})
      })
      .catch( error => {
        res.status(500).json({ error: "The post could not be removed", error })
      })
  })

server.listen(8000)