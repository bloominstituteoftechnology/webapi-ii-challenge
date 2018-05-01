// import your node modules

const db = require("./data/db.js");

// add your server code starting here

const express = require("express");

const server = express();

//get commands here

server.get("/", (req, res) => {
  res.send("API running");
});

server.get("/api/posts", (req, res) => {
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(error => {
      // error event thing here
      res.status(500).json({ error: error });
    });
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;

  db
  .findById(id)
  .then(posts => {
    if (posts.length === 0) {
      res.status(404).json({message: 'This post does not exist.'});
    } else {
      res.json(posts[0]);
    }
  })
  .catch(err => {
    res.status(500).json({error: 'The post infomation could not be retrieved'})
  })
});

// server.post('/api.posts', (req, res) =>  {
//   const {title, contents} = req.body;
//   const postNew = {title, contents}

// })

server.listen(5000, () => console.log("\n== API Running on port 5000 ==\n"));
