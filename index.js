// import your node modules
const express = require("express");
const db = require("./data/db.js");
const cors = require("cors");
const port = 3334;
const server = express();
server.use(express.json());
server.use(cors());
// add your server code starting here

const sendUserError = (status, errorMessage, res) => {
  res.status(status).json({ error: errorMessage });
};

server.get("/", (req, res) => res.send("<h1>sup</h1>"));

server.get("/api/posts", (req, res) => {
  db.find().then(posts => {
    if (posts.length) {
      res.json({ posts });
    } else {
      sendUserError(500, "The posts information could not be retrieved.", res);
    }
  });
});

server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id).then(post => {
    if (post[0]) {
      res.json(post[0]);
    } else {
      sendUserError(404, "The post with the specified ID does not exist.", res);
    }
  });
});

server.post("/api/posts", async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      sendUserError(
        400,
        "Please provide title and contents for the post.",
        res
      );
      return;
    }
    const postID = await db.insert({ title, contents });
    const post = await db.findById(postID.id)
    res.status(201).json(post);
  } catch (error) {
    sendUserError(500, "There was an error while saving the post to the database", res);
  }
});

server.delete("/api/posts/:id", async (req, res) => {
    try{
  const { id } = req.params;
  const post = await db.findById(id)
  const response = await db.remove(id)
    if (!response) {
      sendUserError(404, "The post with the specified ID does not exist.", res);
      return;
    }
    res.json(post);
  }
  catch(err){
      sendUserError(500, "The post could not be removed", res)
  }
});

server.put("/api/posts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, contents } = req.body;
    if (!title || !contents) {
      sendUserError(
        400,
        "Please provide title and contents for the post.",
        res
      );
      return;
    }
    const count = await db.update(id, { title, contents });
    if (!count){
        sendUserError(404, 'Post with specified ID does not exist.', res)
        return
    }
    const post = await db.findById(id);
    res.status(200).json(post);
  } catch (err) {
    sendUserError(500, "The post information could not be modified.", res);
  }
});

server.listen(port, () => console.log(`I hear you ${port}`));
