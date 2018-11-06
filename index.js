// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');
// const bodyParser = require('body-parser');

const server = express();
server.use(cors());
server.use(express.json());

server.get('/api/posts', (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'The posts information could not be retrieved'});
    })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(post => {
      if (post && post.length) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The post information could not be retrieved' });
    })
});

server.post('/api/posts', async (req, res) => {
  const postData = req.body;
  if ( !postData.title || !postData.contents || postData.title.length === 0 || postData.contents.length === 0){
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
  } try {
      const postId = await db.insert(postData);
      const post = await db.findById(postId.id);
        res.status(201).json(post)
      //
      // db.insert(postData)
      //   .then(id => {
      //     db.findById(id.id)
      //       .then(post => {
      //     })
      //     return res
      // })
      // .then(res => {
      //   res
      // })
    }
      catch(err) {
        res.status(500).json({ error: 'There was an error while saving the post to the database.'})
      }

})

server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id
  console.log(id);
  db.remove(id)
    .then(count => {
      console.log(res)
      if (res === 1) {
        res.status(200).json({ message: 'deleted!'})
        } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" })
    })
})

server.put('/api/posts/:id', (req, res) => {
const id = req.params.id;
const changes = req.body;
if ( !changes.title || !changes.contents || changes.title.length === 0 || changes.contents.length === 0){
  res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
}
db.update(id, changes)
  .then(count => {
    if(count === 1) {
      db.findById(id)
      .then(post => {
        res.status(200).json(post)
      })
    }
    else {
      res.status(404).json({  message: "The post with the specified ID does not exist." })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be modified." })
  })

// If the post is found and the new information is valid:
//
// update the post document in the database using the new information sent in the reques body.
// return HTTP status code 200 (OK).
// return the newly updated post.
})
//


// add your server code starting here
server.listen(9000, () => console.log('the server lives on port 9000'));
