// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express(); // creates the server

server.use(cors()); // this neeeded to connect from react

server.use(express.json()); // formatting our req.body obj

server.get('/', (req, res) => {
  // request/route handler
  res.send('This is a GET TEST');
});

server.get('/api/posts', (req, res) => {
  db.find()
    .then( posts => {
      console.log('\n** posts **', posts);
      res.json(posts);
    })
    .catch(err => res.status(500).send({ error: "The posts information could not be retrieved." }));

});

// server.get('/api/posts/:id', (req, res) => {
//   db.findById(req.params.id)
//     .then(post => {
//       if (post.length > 0) {
//         res.json(post)
//       } else res.status(404).send({ message: "The post with the specified ID does not exist." });
//     })
//     .catch(err => res.status(500).send({ error: "The post information could not be retrieved." }));
// });

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      if (post.length === 0) {
        res.status(404).send({ message: "The post with the specified ID does not exist." });
      } else res.json(post)
    })
    .catch(err => res.status(500).send({ error: "The post information could not be retrieved." }));
});

server.post('/api/posts', (req, res) => {
  if(!req.body.title || !req.body.contents) {
   return res.status(400).send({ errorMessage: "Please provide title and contents for the post." });
  }
  if(req.body.title && req.body.contents) {
    const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(postId => {
      const { id } = postId;
      db.findById(id)
        .then(post => {
        console.log(post);
        if (!post) {
          return res.status(422).send({ Error: `Post does not exist by that id ${id}` });
        }
        res.status(201).json(post);
      });
    })
    .catch(err => res.status(500).send({ error: "There was an error while saving the post to the database" }));

  }});

server.delete("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await db.remove(id);
    if (post === 0) {
      return res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

server.put('/api/posts/:id', async (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).send({ errorMessage: "Please provide title and contents for the post." });
   } try {
    await db.update(req.params.id, req.body);
    try {
    const post = await db.findById(req.params.id);
    if (post.length === 0) {
      return res.status(404).send({ message: "The post with the specified ID does not exist." });
    } else {
      return res.status(200).json(post);
    }
   } catch (error) {
      return res.status(500).send({ error: "The post information could not be modified." });
   }
  } catch (error) {
    return res.status(500).send({ error: "The post information could not be modified." });
 }
});

const port = 9000;
server.listen(port, () => 
  console.log(`\n=== API running on port ${port} ===\n`)
  );
