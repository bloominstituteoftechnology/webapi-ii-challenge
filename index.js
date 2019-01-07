// import your node modules
const express = require("express");

const db = require("./data/db.js");

const server = express();

// add your server code starting here
/*server.get('/', (req, res) => {
  res.send('<h1>Yo Wassup</h1>')
})*/

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
    res.status(200).json(posts)

    })
    .catch(err => {
      res.status(500).json({ message: 'err'})
    });
});

//2nd get req using find by ID method

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id
  db.findById(id)
    .then(posts => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
    res.status(200).json(posts)

    })
    .catch(err => {
      res.status(500).json({ message: 'err'})
    });
});
server.listen(5000, () => console.log("up and at em!"));
