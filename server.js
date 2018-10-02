// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(cors());

server.use(express.json());

server.get('/', (request, response) => {response.send('<h1>Home Page</h1>');
});

server.get('/api/posts', (request, response) => {
    db.find()
    .then(posts => {
        // console.log('\n** posts **', posts);
        response.json(posts);
    })
    .catch(err => response.send(err));
});

server.get('/api/posts/:id', (request, response) => {   console.log(request.params);
    const id = request.params.id;
    db.findById(id)
    .then(post => {
        // console.log('\n** users **', post);
        response.json(post[0]);
    })
    .catch(err => response.send(err));
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
      .then(postId => {
        const { id } = postId;
        db.findById(id).then(post => {
        //   console.log(post);
          if (!post) {
            return res
              .status(422)
              .send({ Error: `User does not exist by that id ${id}` });
          }
          res.status(201).json(post);
        });
      })
      .catch(err => console.error(err));
  });

server.delete('/api/posts/:id', (req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    db.remove(id)
        .then(removedUser => {
        // console.log(removedUser);
        res.status(200).json(removedUser);
        })
        .catch(err => console.error(err));
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    // ALWAYS CHECK YOUR UPDATES AND RESPOND ACCORDINGLY, THIS ENDPOINT ISNT FINISHED
    const newPost = { title, contents };
    console.log(newPost);
    db.update(id, newPost)
      .then(post => {
        // console.log(post);
        res.status(200).json(post);
      })
      .catch(err => console.error(err));
});

const port = 8000;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} === \n`));