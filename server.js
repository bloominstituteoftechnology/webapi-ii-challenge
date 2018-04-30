// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
const bodyParser = require('body-parser');
server.use(bodyParser.json());

let nextId = 10;
function getNextId() {
    return nextId++;
}
// let posts = db.posts;
let posts = [{title: 'one', contents: "two"}];

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500);
        return res.json({error: "The posts information could not be retrieved."})
    })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
      .findById(id)
      .then(posts => {
          if (posts.length == 0) {
              return res.status(404).json({ message: "The post with the specified ID does not exist." })
          } else {
          res.json(posts)
          }
      })
      .catch(err => {
          res.status(500);
          res.json({error: "The post information could not be retrieved.", err})
          return;
      })
});

server.post('/api/posts', (req, res) => {
    const { title, contents} = req.body;

    if (!title || !contents) {
        res.status(400, "BAD REQUESTS");
        res.json({ errorMessage: "Please provide title and contents for the post." });
        return;
    } else {
    const post = { id: getNextId(), title, contents};
    posts = [...posts, post];
    res.json(posts);
    res.status(202);
    }
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(posts => {
        if (posts.length == 0) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            posts = posts.filter(p => p.id !== Number(id));
            res.send(posts);
        }
    })
    .catch(err => {
        res.status(500);
        res.json({error: "The post could not be removed.", err})
        return;
    })

});

server.listen(5555), () => console.log('API RUNNING ON PORT 5555');
// add your server code starting here
