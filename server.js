// import your node modules
const express = require("express");
const helmet = require("helmet");
const db = require("./data/db");
const server = express();

// add your server code starting here
server.use(helmet());
server.use(express.json());

server.post("/api/posts", (req, res) => {
  db.insert();
});

server.get("/api/posts", async (req, res) => {
  try {
    const posts = await db.fond();
    res.status(200).json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }
});

server.listen(8000, () => console.log("API running..."));
