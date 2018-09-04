const express = require("express"); // CommonJS
//the same as import express from 'express'; //ES2015 Modules

const db = require("./data/db.js");
const server = express();

//configure middleware fro the server

server.use(express.json()); // this teaches express to parse json information from req.body

// configure routing (Routing is also a form of middleware)
server.get("/users", (req, res) => {
  const { sort, field } = req.query;
  
    db.find(sort, field)
    .then(users => {
        res.status(200).json({sortedBy: field, sortOrder: sort, users});
        //sort them
        if(sort){
            
        }
      
    })
    .catch(err => {
      console.log("error", err);
      res.status(500).json({ message: "Error getting the data" });
    });
});

//using query strgin: http://localhost:9000/users ? sort=asc & field=name

server.get("/users/:id", (req, res) => {
    db.find()
    .then(users => {
        if (sort){

        }
    })
})



server.post("/users", async (req, res) => {
  //http message = headers + body(data)
  const user = req.body; //this requires the express.json() middleware
  if (user.naem && user.bio) {
    try {
      const response = await db.insert(user);
      res.status(201).json({ message: "User created successfully" });
      //200-299: success, 300-399: redirection, 400-499: client error, 500+: server error
    } catch (ex) {
      //handle Error
      res.status(500).json({
        title: "Error getting the data",
        dscription: "what happended",
        recoveryInstructions: "thisi is what you can do to recover"
      });
    }
  } else {
    res.status(422).json({ message: "A user needs both a name and bio" });
  }

  // db.insert(user)
  //     .then(response => response.status(201).json(response))
  //     .catch(err => res.status(500).json(err));
});



server.delete("/users/:id", (req, res) => {
  const { id } = req.params; //the same as: const id = req.params.weaponId

  db.remove(id)
    .then(count => {
      if (count) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: "No user with this id was found" });
      }
    })
    .catch(err => res.status(500).json(err));
});


server.put('/users/:id', (req, res) => {
    db.update(req.params.id, req.body).then(users =>{
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({message: 'update failed'}));
});

//start the server
server.listen(9000, () => console.log("\n == API on port 9k ==\n"));
