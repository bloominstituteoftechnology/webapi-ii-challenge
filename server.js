// import your node modules
const express = require("express");

const db = require("./data/db.js");

// add your server code starting here

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello FSW12");
});

server.get("/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error("Error:", err);

      res.status(500, json({ message: "Error getting the data" }));
    });
});

server.post("/users", async (req, res) => {
  //http message = headers + body(data)
  const user = req.body; //this requies the express.json() middleware
  try {
    const response = await db.insert(user);
    res.status(201).json(response);
    //200-299: success, 300-399: redirection, 400-499: client error, 500+: server error
  } catch (ex) {
    // handle error
    res.status(500).json({ message: "Error getting the data" });
  }
});

//start the server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
