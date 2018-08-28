// import your node modules
const express = require('express');

const server = express();

const db = require('./data/db.js');

const cors = require('cors');

server.use(cors());

server.use(express.json());

// add your server code starting here

server.get('/', (req, res) => {
  res.send('Hello CS12');
});




server.post('/posts', (req, res) => {
  console.log(req.body)
  // res.status(201).json(res);

  db.insert(req.body)

    .then( () => {
      db.find()
      .then(posts => {
      res.status(200).json(posts);//this replaces the .send() method above but they perform a similar action. .status() sends an http status code. .json() is used to indicate the datatype that is going to be returned. Which is a json object.
    })
    })
    .catch(() => res.status(400).json({message: 'Please provide title and contents for the post.' }))
})

server.get('/posts/:id', (req, res) => {
  db.findById(req.params.id).then(post => {
    res.status(200).json(post)
  }).catch(err =>  {
    res.status(500).json({message: 'The post with the specified ID does not exist.'})
  })
})

server.get('/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.status(200).json(posts);//this replaces the .send() method above but they perform a similar action. .status() sends an http status code. .json() is used to indicate the datatype that is going to be returned. Which is a json object.
  })
  .catch(err => {
    console.error('error', err);
    res.status(500).json({message: 'The posts information could not be retrieved.'})
  })
})

server.delete('/posts/:id', (req, res) => {

  db.findById(req.params.id)
    .then(post => {
       res.status(200).json(post)
    })
    .catch(err => {
      res.status(404).json(err)
    })

  db.remove(req.params.id)
    .then(count => {
      if (count > 0) {
        console.log(count)
        res.status(204).end()
      } else {
        res.status(404).json({message: "no user with this id was found"});
      }
    })
    .catch( err => {res.status(500).json({ error: "The post could not be removed"})})
})

server.put('/posts/:id', (req, res) => {
  if (req.body.title && req.body.contents) {
    db.update(req.params.id, req.body)
      .then(post => {
        console.log(post) // how to tell what the response is.
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({message: "cannot find id"})
        }
      }).catch(err =>
         res.status(500).json({message: 'the post information could not be modified'})
       );
  } else {
    res.status(422).json({message: 'post needs a title and content.'})
  }

})


server.listen(9001, () => console.log("== API on port 9k =="));
