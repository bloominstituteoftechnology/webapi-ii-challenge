const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());


server.get('/', (req, res) =>{
  res.send('<h2> bout that blog life</h2>')
});

//find (all posts)
server.get('/api/posts', (req, res)=>{
  db.find()
  .then(allPosts =>{
    res.json(allPosts);
  })
  .catch(({code, message}) =>{
    res.status(code).json({ err: message})
  })
})

//find by id
server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the Post',
    });
  }
});

//insert
server.post('/api/posts', async (req, res) => {
  try {
    const post = await Posts.insert(req.body);
    res.status(201).json(post);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error adding the post',
    });
  }
});

//update
server.put('/api/posts/:id', async (req, res) => {
  try {
    const hub = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post',
    });
  }
});

//remove
server.delete('/api/posts/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post',
    });
  }
});

server.listen(9000, ()=>{
  console.log('listening on port 9000')
});