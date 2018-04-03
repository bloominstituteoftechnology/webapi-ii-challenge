// import your node modules
const express = require('express');

const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json()); 
server.use(bodyParser.urlencoded())

const db = require('./data/db.js');
// server.use(express.json());

server.get('/', function(req, res){
  res.send({api: 'API running...'});
});

server.get('/api/posts', (req, res) => {
  db
  .find()
  .then(posts => {
    res.json(posts);
  })
  .catch(error => {
    res.status(500).json({ error: "The posts information could not be retrieved." });
  });
});

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db
  .findById(id)
  .then(posts => {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
  .catch(error => {
      res.status(500).json({ error: "The post information could not be retrieved." });
  });
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    let title = req.body.title;
    let contents = req.body.contents;
    if (!title || !contents) {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(post)
   
    .then(newId => {
        console.log('newId', newId)
        return newId
    })
    .then(id => {
        console.log('id.id', id.id)
        return db.findById(id.id)
        // res.json('HELLO')
    })
    .then(p => {
        console.log('p', p)
        // console.log('p.id', p.id)
        res.status(201).json(p)
    })
    .catch(error => {
        res.status(500).json(error)
    })
  });


server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  let post; 

  db
    .findById(id)
    .then(response => {
    user = { ...response[0] };

    db
    .remove(id)
    .then(response => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(404).json({ message: "The post with the specified ID does not exist." })
    });
  })
  .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
  });
});

// server.post('/api/posts', (req, res) => {
//   let title = req.body.title;
//   let contents = req.body.contents;
//   if (title === null || contents == null) {
//     res.status(400);
//   }

//   // if either title or contents are empty, do this
//   // res.status(400);

//   db
//   .insert(post)
//   .then(posts => {
//       res.json(posts[0]);
//       res.status(201)
//   })
//   .catch(error => {
//       res.status(500).json(error);
//   });
// });



// add your server code starting here
const port = 3000;
server.listen(port, () => console.log('API running on port 3000'));
