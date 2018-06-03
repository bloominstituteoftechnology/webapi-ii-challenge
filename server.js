// import your node modules
const express = require("express");
const cors = require("cors");
const db = require("./data/db.js");

const port = 5000;
const server = express();
server.use(express.json()); // This middleware (express.json()) is used to parse data coming in
server.use(cors({ origin: "http://localhost:3000" })); // cors is used to enable communication from other ports/URLs

// add your server code starting here

const sendUserError = (status, message, res) => {
  // This is just a helper method that we'll use for sending errors when things go wrong.
  res.status(status).json({ errorMessage: message });
  return;
};

server.get("/", (req, res) => {
  // 1st arg: route where a resource can be interacted with
  // 2nd arg: callback to deal with sending responses and handle incoming data
  res.send("Hello from express");
});

server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res.status(400);
    res.json({
      errorMessage: "Please provide title and contents for the post."
    });
    //I did it without the custome middleware just to remember how to do it
    return;
  }
  db
    .insert({ title, contents })
    .then(response => {
      res.status(201); //201=== sucessfully created
      db.findById(response.id).then(post => res.json({ post }));
    })
    .catch(error => {
      sendUserError(
        500,
        "There was an error while saving the post to the database.",
        res
      );
    });
});

server.listen(port, () => console.log(`\n Server running on port ${port}\n`));
