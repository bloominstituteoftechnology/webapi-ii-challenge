// import your node modules
const express = require('express');
// const cors = require('cors');
const server = express();
// server.use(cors());
// server.use((request, response, next) => {
//   response.header("Access-Control-Allow-Origin", "*");
//   response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
server.use(express.json());

const db = require('./data/db.js');

// add your server code starting here
server.get('/', (req, res) => {
  res.json('Welcome to the server! Try adding: /api/posts');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    })
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(post => {
      console.log(post);
      if (post.length > 0) {
        console.log('post exists')
        res
          .status(200)
          .json(post);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    })
})

server.post('/api/posts', async (req, res) => {
  const post = req.body;
  if(post.title && post.contents !== "") {
    try {
      const postId = await db.insert(post);
      const thisPost = await db.findById(postId.id);
      res.status(201).json(thisPost);
    } catch (error) {
      res.status(500).json({ error: 'There was an error while saving the post to the database' });
    }
  } else {
    res.status(400).json({ errorMessage: "Please provide title and contents for the post."})
  }
});

server.put('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  const changes = req.body;
  db.update(id, changes)
    .then(count => {
      if (count) {
      res.status(200).json({ message: `Post number ${count} updated`});
    } else {
      res.status(404).json({ message: "Cannot edit a post that doesn't exist..."})
    }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating the post!!!!', error })
    });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count);
    })
    .catch(err => {
      res.status(500).json({ message: 'error deleting post!!!' })
    })
});
const port = 7777;
server.listen(port, () => console.log(`server is operational on port ${port}`));