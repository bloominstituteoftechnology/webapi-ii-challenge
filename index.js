// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
const cors = require('cors');

server.use(cors());

server.use(express.json());

server.get('/', (req, res) => { //request/route handler
    res.send('Hello FSW13');
});

server.get('/api/posts', (req, res) =>{
    db.find().then(posts => {
        res.json(posts);
    }).catch(err => res.send(err))
});

server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    db.findById(id)
      .then(post => {
        if(!post){
            return res.status(404).send({message: "The post with the specified ID does not exist." })
        }
          console.log(post);
          res.json(post);
      })
      .catch(err => console.error(err))
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.insert(newPost)
      .then(postId => {
          const { id } = postId;
        db.findById(id)
          .then(post => {
              if(!post){
                  return res.status(400).send({errorMessage: "Please provide title and contents for the post."})
              }
              res.status(201).json(post)
          });
      }) 
      .catch(err => console.error(err))
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
      .then(removePost => {
         console.log(removePost);
         res.status(200).json(removePost);
      })
      .catch(err => console.error(err))
    res.send(req.params);
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.update(id, newPost)
      .then(post => {
          res.status(200).json(post)
      })
      .catch(err => console.error(err));
});
// add your server code starting here
const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));