const express = require("express");

const db = require("./data/db.js");
const server = express();

server.use(express.json());

// server.get("/", (req, res) => {
//   res.send("Testing Server");
// });

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.error("error", err);

      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
  // res
  //   .send(req.params.id)
  //   .then()
  //   .catch();
  // db.find(req.params.id)

  // db.find()
  //   .then(post => {
  //     res.status(200).json(posts);
  //   })
  //   .catch(err => {
  //     console.log("error", err);

  //     res
  //       .status(404)
  //       .json({ message: "The post with the specified ID does not exist." });
  //   });
  let id = req.params.id;
  db.findById(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    });
});

server.listen(8000, () => console.log("\n== API on port 8k === \n"));
