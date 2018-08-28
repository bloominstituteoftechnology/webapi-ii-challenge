// import your node modules
const express = require("express");
const db = require("./data/db.js");
const server = express();

server.use(express.json());

// add your server code starting here
server.get("/", (req, res) => {
  res.send("Hello World");
});

server.get("/posts", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);

      res.status(500).json({ message: "Error Getting Data" });
    });
});
server.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  db.findById(id)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      console.log("error", err);
      res
        .status(404)
        .json({ message: "The posts with the specified ID does not exist." });
    });
});

server.post("/posts", async (req, res) => {
  const posts = req.body;
  if (posts.title && posts.contents) {
    try {
      const response = await db.insert(posts);
      res.status(201).json({ message: "Post created successfully" });
    } catch (err) {
      res.status(500).json("Error with the server");
    }
  } else {
    res
      .status(422)
      .json({ message: "A posts needs both a title and contents" });
  }
});

server.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  db.remove(id)
    .then(count => {
        if(count){
            res.status(204).end()
        }else{
            res.status(404).json({message: "No Post found with that id"})
        }
    })
    .catch(err => res.status(500).json(err));
});

server.put('/posts/:id', (req, res)=>{
    db.update(req.params.id, req.body).then(posts =>{
        res.status(200).json(posts)
    })
    .catch(err => res.status(500).json({message: "Update failed"}))
})
server.listen(8000, () => console.log(`/n== API on port 8k ==/n`));
