// add your server code starting here
const express = require("express");

// allow cors
const cors = require("cors");

// pull in database
const db = require("./data/db.js");

// server initialization
const server = express();
server.use(express.json());
server.use(cors());

// port number initialization
const port = 9000;

// test page
server.get("/", (req, res) =>
  res.send(`
<h1>Weclome</h1>
<h2>API End Points</h2>
<ul>
  <li><a href=http://localhost:${port}/api/posts>/api/posts</a></li>
</ul>
`)
);

// GET Listeners
server.get("/api/posts", (req, res) => {
  // Route Hanlder callback
  console.log("\n=== /api/posts ===\n");
  db.find()
    .then(posts => res.json(posts))
    .catch(err =>
      res.status(500).send(`The posts information could not be retrieved.`)
    );
});

// POST Listeners
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  db.insert(newPost)
    .then(post => {
      db.findById(post.id)
        .then(foundPost => res.json(foundPost))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
});

// DELETE Listners
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(removedPost => res.status(200).json(`Post at ${id} deleted.`))
    .catch(err => res.status(500).send(`Post at id ${id} not deleted...`));
});

// PUT Listners
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const newPost = { title, contents };
  console.log(id);
  console.log(newPost);
  db.update(id, newPost)
    .then(post => {
      console.log(post);
      // res.status(200).json(post);
      db.findById(id)
        .then(foundPost => res.json(foundPost))
        .catch(err => console.error(err));
    })
    .catch(err => res.status(500).send(`Post at id ${id} failed to update...`));
});

// set up server to listen to w/e number port is
server.listen(parseInt(port, 10), () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
