const express = require('express');

const db = require('./data/db.js');

const server = express();
const PORT = 4000;

server.get('/api/posts', (req, res) => {
    db.find()
       .then(posts => {
           res.status(200).json(posts)
       })
       .catch(err => {
           res
           .status(500)
           .json({error: "The posts information could not be retrieved." });
       });
  });

  server.get('/api/posts/:id', (req, res) => {
      const id = req.params.id;

      db.findById(id)
        .then(post => {
            if (post) {
                res.json(post);
            } else {
                res
                .status(404)
                .json({message: "The post with the specified ID does not exist."});
            }
        })
        .catch(err => {
            res
                .status(404)
                .json({ error: "The post information could not be retrieved."  })
        });
  });

  server.listen(PORT, () => {
      console.log( `server is up and running on port ${PORT}`);
  })