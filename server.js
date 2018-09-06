// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');
const bodyParser = require('body-parser');

// add your server code starting here
server.use(express.json());
server.get('/', (req, res) => {
  res.send("what's up ma brutha?")
});

//------Get request methods-------//

server.get('/api/posts', (req, res) => {
  db.find()
  .then((posts) => {
    res.status(200).json(posts);
  })
  .catch(err =>
  {
    res
      .status(500)
      .json({error: "The posts information could not be retrieved."})
  })
});

//ID:
server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
.then(post => {
      console.log(post);
      if (post.length === 0) {
        res.status(404).json({  message: 'The post with the specified ID does not exist.' });
      }
      else {
        res.status(200).json(post)
    }})
  .catch(err =>
  {
    res
      .status(500)
      .json({error: "The post information could not be retrieved."})
  });
});
//can't call it id if I define an id

//--------Post---------- //
server.post('/api/posts/:id', (req, res) => {
  const { title, contents} = req.body;
  if  (!title || !contents)  {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.insert(req.body)
    .then(id => {
      db.find(id)
        .then(post => res.status(201).json(req.body))
        .catch(err => {
          res.status(500).json({error: "There was an error while saving the post to the database"})
        })
    });
});

//----Delete --------//
server.delete('/api/posts/:id', (req, res) => {
      db.remove(req.params.id)
    .then(posts => {
          if (posts.length === 0) {
                      res.status(404).json({ error: 'The post with the specified ID DNE.' });
          }
          else {
            res.status(200).json(posts)
          }
        })
        .catch(err => {
          res.status(500).json({ error: 'The post could not be removed.' });
        });
    });

    // ---- Put Method -----//

server.put('/api/posts/:id', (req, res) => {
  const {title, contents} = req.body;
  const id = req.params.id
  if  (!title || !contents)  {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.update(id, req.body)
  .then(post => {
    if(post.length === 0){
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    else {
      res.status(201).json({ message: 'Your post was updated successfully' })
    }
  })
  .catch(err => {
    res.status(500).json({ error: "The post information could not be modified." })
  })

})



//listener
server.listen(9000, () => console.log('API running on port 9000'))
