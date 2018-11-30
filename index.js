// import your node modules
const express = require('express');
const db = require('./data/db');
const server = express();
const PORT = 4000;
var cors = require('cors')
//const app = express()
 
server.use(cors())

const sendUserError = (msg, res) => {
    res.status(400);
    res.json({ Error: msg });
    return;
  };
 
//app.use(cors())

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
    .then((posts) => {
        res.json(posts);
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The posts information could not be retrieved."});
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
    .then(post => {
     if (post) {
         res.json(post);
     } else {
         res
         .status(404)
         .json({ message: "The post with the specified ID does not exist."})
     }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post information could not be retrieved."});
    });
});



server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const foundPost = db.find(post => post.id == id);
    if (foundPost) {
   db.remove(id)   
    res
    .then(post => {
     if (post === 1) {
         res.json(post);
     } else {
         res
         .status(404)
         .json({ message: "The post with the specified ID does not exist."})
     }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post could not be removed."});
    });
});


server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;
    const newPost = { title, content }
    db.update(id, newPost)
    .then(post => {
     if (post) {
         res.json(post);
     } else {
         res
         .status(404)
         .json({ message: "The post with the specified ID does not exist."})
     }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post could not be modified."});
    });
});



server.post('/api/posts', (req, res) => {
    const { id } = req.params
    const { title, content } = req.body;
    const newPost = { title, content }
    if (!title || !content) {
       res
       .status(400)
       .json({ message: "Please provide title and contents for the post."})
      } else {
    db.insert(newPost)
    .then(post => {
     if (post === 1) {
         res.json(post);
     } else {
         res
         .status(404)
         .json({ message: "The post with the specified ID does not exist."})
     }
    })
    .catch(err => {
        res
        .status(500)
        .json({error: "The post could not be modified."});
    })};
});


server.listen(PORT, () => {
    console.log(`server is running on port ${PORT} `);
});



