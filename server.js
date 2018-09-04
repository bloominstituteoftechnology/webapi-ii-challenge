// import your node modules
const express = require("express"); //CommonJS modules
//the same as import express from 'express'; //ES2015 modules

const db = require("./data/db.js"); //<======this

// add your server code starting here

const server = express();
//configure middleware for ther server
server.use(express.json()); //this teaches express to parse json info from req.body

//configure routing (routing is also a form of middleware)
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

  if (user.name && user.bio) {
    try {
      const response = await db.insert(user);
      res.status(201).json(response);
      //200-299: success, 300-399: redirection, 400-499: client error, 500+: server error
    } catch (ex) {
      // handle error
      res.status(500).json({
        title: "Error adding the user",
        description: "what happened",
        recoveryInstructions: "this is what you can do to recover"
      });
    }
  } else {
    res.status(422).json({ message: "a user needs both a name and bio" });
  }

  //Alternative way of writing my code db
  // db.insert(user)
  //   .then(response => response.status(201).json(response))
  //   .catch(err => res.status(500).json(err));
});

//start the server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));
