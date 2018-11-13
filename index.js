// import your node modules
const express = require('express');
const server = express();

const db = require('./data/db.js');//where is your data stored?

//middleware
server.use(express.json());

// add your server code starting here
server.get('/', (req, res) => {
  res.json('the home server get!')
})

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist."});
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved."})
    })
});

server.post('/api/posts', async (req, res) => {
  console.log('body:', req.body);
  try {
    const postData = req.body;
    const postId = await db.insert(postData);
    const post = await db.findById(postId.id);

    res.status(201).json(postId);
  }catch (error) {
    let message = "error creating the post";

    if(error.errno === 19) {
      message = "you need both title and contents";
    }
    res.status(500).json({ message: "error creating post", error })
  }
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  db.update(id, changes)
    .then( count => {
      if(count) {
        res.status(200).json({ message: `${count} post updated`})
      } else {
        res.status(404).json({ message: "post not found" })
      }
    })
    .catch( err => {
      res.status(500).json({ message: "error updating the post "})
    });
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id)
    .then(count => {
      res.status(200).json(count)
    }).catch (err => {
      res.status(500).json({ message: 'error deleting post' })
    })
})

server.listen(8000, () => console.log('server is online!'))

