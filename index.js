const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(express.json());
const PORT = 4000;

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
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
                    .json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be retrieved." })
        });
});

server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body
    console.log(title,contents)
    db.insert({"title": title, "contents":contents})
        .then(post => {
            if (post) {
                res.status(201).json(post)
            } else {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            }
        })
        .catch(err => {
            console.log('200')
            res.status(500).send({ error: "this didnt work"})
        })
})
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
      .then(remove => {
         if (remove) {
          res.status(200).json(remove)
         } else {
             res.status(404).json({message: "The post with the specified ID does not exist."})
         }
      })
      .catch(err => {
          res.status(500).json({error: "The post could not be removed" })
      })
})

server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id
    const {title, contents} = req.query
    console.log(title,contents)
    db.update(id, {"title": title, "contents":contents})
      .then(update => {
          if(update) {
              res.status(200).json({"title":title, "contents": contents, id:id})
          } else {
              res.status(404).json({message: "The post with the specified ID does not exist."})
          }
      })
      .catch(err => {
          res.status(500).json({error: "The post information could not be modified."})
      })
})
server.listen(PORT, () => {
    console.log(`server is up and running on port ${PORT}`);
})