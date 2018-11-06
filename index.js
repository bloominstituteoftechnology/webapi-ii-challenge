// import your node modules

const express = require('express');
const server = express();
const db = require('./data/db.js');
const getPosts = require('./getPosts')
const getById = require('./getById')
const cors = require('cors');

// add your server code starting here
//

server.use(cors());
server.use(express.json());
server.get('/', (req, res)=> {
  res.send('hello from express');
})

server.get('/api/posts', getPosts);

// server.get('/api/post/:id', (req, res) => getById(req, res))

server.get('/api/posts/:id', (req, res)=> {
  const {id} = req.params;
  console.log(req.params)
  db.findById(id)
    .then(post => {
      //we check for a post and if there's a post length. Even if there is one post. We send the post. Otherwise we send the error message.
      if(post && post.length) {
        res.status(200)
        .json(post);
      } else {
        res.status(404)
        .json({message: 'There is not post with that id'})
      }
    })
})

server.delete('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  db.remove(id).then(count => {
    if(count) {
      res.status(200).json({message: `${count} post deleted`})
    } else {
      res.status(404).json({message: 'Post not found'})
    }
  }).catch(error => {
    res.status(500).json({message: 'there was a problem deleting the post'})
  });

})

server.put('/api/posts/:id', (req, res) => {
  const {id} = req.params;
  const changes = req.body;
  db.update(id, changes).then(count => {
    console.log(count)
    if(count) {
      res.status(200).json({message: `${count} users updated`})
    } else {
      res.status(404).json({message: 'user not found'})
    }
  }).catch(error => {
    res.status(500).json({message: 'The post could not be modified'})
  })


})


server.post('/api/posts', async (req, res) => {
  try {
    const postData = req.body;
    if(postData.title.length === 0 || postData.contents.length === 0) {
      res.status(500).json({message: "No empty stings"})
    } else {
      const postId = await db.insert(postData)
      const post = await db.findById(postId.id)
      res.status(201).json(post)
    }
  } catch(error) {
    let message = 'error creating user'
      if(error.errno === 19) {
        message = 'please provide both the title and the contents'
      }
    res.status(500).json({message, error})
  }
})

server.listen(5000, (res, req) => {
  console.log('the server is listening on 5000')
})
