// import your node modules
const express = require("express");
// const helmet = require('helmet');
const db = require("./data/db.js");
const fs = require("fs"); //
// const bodyParser = require("body-parser");   //this is an external npm module to parse, unnecessary since express has built in parser

const server = express();

// middleware
server.use(express.json()); //built in Express parser 
// server.use(helmet()); //security module
// server.use(bodyParser.json());   //this is an external npm module to parse

// route handlers   (Note routing is just middleware)
server.post("/api/users", (req, res) => {
  const userInfo = req.body;
  console.log("user Info", userInfo);

  db
  .insert(userInfo)
  .then(response => {
    res.status(201).json(response);
  })
  .catch(err => {
    res.status(500).json({error: err});
  });
});


// http://foo.com?search=bar&sort=asc
// req.query === { search: 'bar', sort: 'asc'}

// add your server code starting here
//testing server setup
server.get("/", (req, res) => {
  res.send("Api running");
});

//get the posts
server.get("/api/posts", (req, res) => {
  // fs.readFile('file', 'filetype you want it to be read as'); //use if getting
  db
    .find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

// /api/posts/123
server.get("/api/posts/:id", (req, res) => {
  // grab the id from URL parameters
  const id = req.params.id;

  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "post not found" });
      } else {
        res.json(posts[0]);
      }
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

server.post("/api/posts", (req, res) => {
  const post = req.body;

  if (post.title === "" || post.contents === "") {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  } else {
    db
      .insert(post)
      .then(response => {
        res.status(201).json({ post });
      })
      .throw(() => {
        res.status(500).send({
          error: "There was an error while saving the post to the database"
        });
      });
  }
});

server.delete('/api/users', function(req, res) {
  const { id } = req.query;
  let user;
  db
    .findById(id)
    .then(foundUser => {
      user = { ...foundUser[0] };

      db.remove(id).then(response => {
        res.status(200).json(user);
      });
    })
    .catch(err => {
      res.status(500).json({ erro: err });
    });
});

server.put('/api/users/:id', function(req, res) {
  const { id } = req.params;
  const update = req.body;

  db
    .update(id, update)
    .then(count => {
      if (count > 0) {
        db.findById(id).then(users => {
          res.status(200).json(users[0]);
        });
      } else {
        res.status(404).json({ msg: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


let port = 8999;
server.listen(port, () =>
  console.log("\n== API Running on port " + port + " ==")
);
