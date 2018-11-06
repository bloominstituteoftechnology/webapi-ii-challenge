// import your node modules
const express = require('express')
const db = require('./data/db.js');
const server = express();
// add your server code starting here


server.get('/api/posts', (req, res) => {
    db.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res
              .status(500)
              .json({ error: 'The posts information could not be retrieved' });
          });
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(user => {
        if (user) {
          res.status(200).json(user);
        } else {
          res.status(404).json({ message: 'user not found' });
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ message: "The post with the specified ID does not exist.", error: err });
      });
  });


server.listen(9000)