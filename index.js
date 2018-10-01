// add your server code starting here
const express = require("express");

// allow cors
const cors = require("cors");

// pull in database
const db = require("./data/db.js");

// server initialization
const server = express();

// use cors on server
server.use(cors());

// port number initialization
const port = 9000;

// test page
server.get("/", (req, res) => res.send(`
<h1>Weclome</h1>
<h2>API End Points</h2>
<ul>
  <li><a href="http://localhost:9000/api/posts">/api/posts</a></li>
</ul>
`));

// GET listener
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.json(posts))
    .catch(err => res.send(err));
});

// set up server to listen to w/e number port is
server.listen(parseInt(port, 10), () =>
  console.log(`\n=== API running on port ${port} ===\n`)
);
