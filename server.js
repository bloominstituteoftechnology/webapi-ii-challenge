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
  db.find().then((posts) => {
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
  .then((post) => {
    !post ?
    res.status(404).json({message: 'The Post with the specified ID does not exist.'})
    : res.status(200).json(post)
  })
  .catch(err =>
  {
    res
      .status(500)
      .json({error: "The post information could not be retrieved."})
  });
});
//can't call it id if I define an id

//--------Post---------- //
server.post('/api/posts', (req, res) => {
  const { title, contents} = req.body;
  if  (!title || !contents)  {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' });
  }
  db.insert({ title, contents })
    .then(id => {
      db.find(id)
        .then(post => res.status(201).json({ title, contents }))
        .catch(err => {
          res.status(500).json({error: "There was an error while saving the post to the database"})
        })
    });
});

//----Delete --------//


server.listen(8000, () => console.log('API running on port 8000'))
