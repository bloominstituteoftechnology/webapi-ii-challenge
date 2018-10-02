// import your node modules

const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here

const server = express();

server.use(cors());
server.use(express.json());

const port = 7500;

server.listen(port, () =>
  console.log(`Testing port ${port}`)
);

server.get('/', (req, res) => {  
  res.send('<h3>I am ROOT</h3>')
});

server.get('/api/posts', (req, res) => {  
  db.find()
    .then(posts => {
      res.json(posts)
    })
    .catch(err => {
      res.status(500).json({ message: "The post with the specified ID does not exist." })
    })
});


server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };

  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id).then(post => {
        if (!title || !contents) {
          return res.status(400)
            .send({ errorMessage: "Please provide title and contents for the post." });
        }
        res.status(201).json(post)
      })
    })
    .catch(err => console.log(err));
});

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removedPost => {      
      db.findById(id).then(post => {
        if (!id) {
          return res.status(404).send({ message: "The post with the specified ID does not exist." })
        }
        res.status(200).json(removedPost);
      })
    })
    .catch(err => {
      res.status(500).send({ error: "The post could not be removed" })
    });
});

// server.delete('/api/posts/:id', (req, res) => {
//   const { id } = req.params;

//   db.remove(id)
//     .then(removedPost => {
//       res.status(200).json(removedPost);
//     })
//     .catch(err => console.log(err));
// });

// server.put('/api/users/:id', (req, res) => {
//   const { id } = req.params;
//   const { title, contents } = req.body;

//   const newPost = { title, contents };

//   db.update(id, newPost)
//     .then(newUpdate => {

//       db.findById(id).then(post => {
//         if (!title || !contents) {
//           return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
//         } else if (!id) {
//           return res.status(404).send({ message: `The post with the specified ID, ${id} does not exist.` })
//         }
//         res.status(200).json(newUpdate)
//       })
//     })
//     .catch(err => {
//       res.status(500).send({ error: "The post information could not be modified." })
//     })
// })

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  // ALWAYS CHECK YOUR UPDATES AND RESPOND ACCORDINGLY, THIS ENDPOINT ISNT FINISHED
  const newPost = { title, contents };
  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      // console.log(post);      
      if (!id) {
        return res.status(404).send({ message: `The post with the specified ID does not exist.` })
      } else if (!title || !contents) {
        return res.status(400).send({ errorMessage: "Please provide title and contents for the post." })
      }
      res.status(200).json(post);
    })
    .catch(err => console.error(err));
  });