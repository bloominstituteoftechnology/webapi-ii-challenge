// import your node modules
const express = require('express')

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(express.json())


server.get('/posts', (req, res) => {
    db.find().then(posts => {
        res.status(200).json(posts);
    }).catch(err => {
        console.error('error',err);

        res.status(500).json({ message:'Error getting the posts'});
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
      if(!req.body.title || !req.body.contents){
          res.status(400).json({errorMessage: 'Please provide title and contents for post.'})
      }
      db.insert(req.body).then(id => {
          res.status(201).json(id)
      }).catch(err => {
          console.error('error',err);
          res.status(500).json({error: 'There was an error while saving the post to the database.'})
      })
  });

  server.delete('/posts/:id', (req, res) => {
      const { id } = req.params;

      db.remove(id)
      .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist"});
        } else {res.status(200).json(posts);
        }
      })
      .catch(err => {
          res.status(500).json({error: "The post could not be removed"});
      })
  });


  server.put('/posts/:id', (req, res) => {
      db.update(req.params.id, req.body).then(posts => {
          res.status(200).json(posts)
      })
      .catch(err => res.status(500).json({ message: 'update failed'}));
  })
  

server.listen(4000, () => console.log('\n== API on port 4k ==\n'));