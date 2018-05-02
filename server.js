// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
// add your server code starting here

// add middleware
server.use(express.json());

// ------ GET ALL POSTS ------
server.get('/api/posts', (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res.status(500).json({ msg: 'The posts information could not be retrieved.' });
    })
});

// ------ GET SPECIFIC POST ------
server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
    .findById(id)
    .then(posts => {
      if (posts.length ===0) {
        res.status(404).json({ msg: 'The post with the specified ID does not exist.' });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ msg: 'The post information could not be retrived.' })
    })
});

// ------ POST NEW POST ------
server.post('/api/posts', (req, res) => {
  const postInfo = req.body;

  db.insert(postInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
          res.status(400).json({ msg: 'Please provide title and contents for the post.'});
        }
        res.status(500).json({ msg: 'There was an error while saving the post to the database.' })
    })
});

// ------ UPDATE A POST ------
server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if(count > 0 && update.title !== '' && update.contents !== '') {
        db.findById(id).then(posts => {
          res.status(200).json(posts[0]);
        });
      } else if (update.title === '' || update.contents === ''){
        res.status(400).json({ msg:  'Please provide title and contents for the post.' });
      } else {
        res.status(404).json({ msg: 'The post with the specified ID does not exist.' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// { msg: 'The post information could not be modified.' }


// ------ DELETE A POST ------
server.delete('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db
  .findById(id)
  .then(foundPost => {
    post = { ...foundPost[0] };
    if(foundPost.length > 0) {
      db.remove(id)
        .then(response => {
          res.status(200).json(post);
        });
    } else {
      res.status(404).json({ msg: 'The post with the specified ID does not exist.'});
    }
  })
  .catch(err => {
    res.status(500).json({ msg: 'The post could not be removed.' });
    console.log(err);
  });
});

server.listen(3000, () => console.log('\n... API Running on port 3000 ...\n'));