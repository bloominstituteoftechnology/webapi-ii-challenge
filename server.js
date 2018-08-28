// import your node modules
const express = require("express");
const db = require('./data/db.js');
const cors = require('cors');

const server = express();

server.use(express.json());
server.use(cors());

// add your server code starting here

server.get("/", (req, res) => {
	res.send("Hello Cs12");
});

server.get("/posts", (req, res) => {
	db.find()
		.then(users => {
			res.status(200).json(users);
		})
		.catch(err => {
      console.log(err);
			res.status(500).json({ 
        error: "The users information could not be retrieved." 
      });
		});
});

server.get("/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then(result => {
      if (result.length > 0) {
        res.status(200).json(result)
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.err(err);
      res.status(500).json({
        error: "The post information could not be retrieved."
      })
    }) 
})

server.post("/posts", (req, res) => {
  if (req.body.title && req.body.contents) {
    db.insert(req.body) 
      .then(response => {
        res.status(201).json({
          id: response.id, 
          title: req.body.title, 
          contents: req.body.contents
        })
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      })
  } else {
    return res.status(400).json({
      errorMessage: "Please provide a title and contents for the post."
    })
  }
})

server.delete("/posts/:id", (req, res) => {
  db.remove(req.params.id)
    .then(result => {
      if (result > 0 ) {
        res.status(200).json({
          id: req.params.id
        })
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "The post could not be removed."
      })
    })
})

server.put("/posts/:id", (req, res) => {
  if (!(req.body.title && req.body.contents)) {
    return res.status(400).json({
      errorMessage: "Please provide a title and contents for the post."
    });
  }
  db.update(req.params.id, req.body)
    .then(result => {
      if (result > 0) {
        res.status(200).json({
          id: req.params.id, 
          title: req.body.title,
          contents: req.body.contents
        })
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({
        error: "The post information could not be modified."
      })
    })
})

//Start server
server.listen(9000, () => console.log("\n== API on port 9k ==\n"));