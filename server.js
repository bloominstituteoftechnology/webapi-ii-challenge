// import your node modules

const bodyParser = require("body-parser")
const express = require("express");
const db = require("./data/db");
const server = express();
const port = 5000;

app.use(bodyParser.json());

// add your server code starting here

server.use(express.json());
server.get("/", (req, res) => {
  res.json("Hello from express");
});


server.get("/api/user/:id", (req, res) => {
  db
    .findById(id)
    .than(user => {
      if (user.length > 0) {
        res.status(200).json({ users });
      } else {
        res.status(404).json({ msg: "No user found" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The user with the specified ID does not exist." });
    });
});

server.listen(port, () => console.log(`Server is running on port ${port}`));

