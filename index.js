// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const PORT = 4000
const parser = express.json();

server.use(parser);
//Grabs alll post in the database
server.get('/api/posts', (req, res) => {
    db.find()
      .then(post => {
        res
            .json(post);
    })
//Reports back in json data form for user when error occurs
      .catch(err => {
        res
            .status(500)
            .json({ error: "The posts information could not be retrieved." });
    })
});

//Endpoints
//Grabs posts by Id when the user request a specific post id
server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(postId => {
        if (postId.length > 0) {
          res.json(postId);
        } else {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
        }
    })
//Reports back in json data form for user when error occurs
        .catch(err => {
        res
            .status(500)
            .json({ error: "The post information could not be retrieved." })
    })
});

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
    db.insert(post).then(idInfo => {
        db.findById(idInfo.id).then(post => {
            res
              .status(201)
              .json(post);
        })
    }).catch(err => {
        res
          .status(500)
          .json({ error: "There was an error while saving the post to the database" })
    });
  } else {
      res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
  }
});

server.delete('api/posts/:id', (req, res) => {
   const { id } = req.params;
    
    db.findById(id).then(post => {
        if (post) {
            const removedPost = post[0];
        db.remove(id).then(count => {
            if (count) {
                res.json(removedPost);
            }
            });
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
           }
        }).catch(err => {
        res.status(500).json({ error: "The post could not be removed" })
    })
});


//server listening service
server.listen(PORT, () => {
    console.log(`Server is up on ${PORT}`)
})