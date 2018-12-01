// import your node modules

const db = require('./data/db.js');
const express = require("express");
const server = express();
//add parser
server.use(express.json());
const PORT = 4000;

//get request
server.get("/api/posts", (req, res) => {
   db.find()
      .then(post => {
         if(post) {
            res.json(post);
         } else {
            res.status(500).json({ error: "The posts information could not be retrieved." })
         }
      })
      .catch(err => {
         res.status(500).json({ error: "The posts information could not be retrieved." })
      });
});

server.get("/api/posts/:id", (req, res) => {
   const {id} = req.params;
   db.findById(id)
      .then(post => {
         if(post.length > 0){
            res.json(post);
         } else {
            res.status(404)
               .json({ message: "The post with the specified ID does not exist." })
         }
      })
      .catch(err => {
         res.status(404)
            .json({ message: "The post with the specified ID does not exist." })
      });
});

//post request
server.post("/api/posts", (req, res) => {
   const post = req.body;
   if(post.title && post.contents) {
      db.insert(post)
         .then(postId => {
            db.findById(postId.id)
               .then(post => {
                  res.status(201).json(post)
               })
         })
         .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" });
         })
   } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
   }
});

//delete request
server.delete("/api/posts/:id", (req, res) => {
   const {id} = req.params;
   db.remove(id)
      .then(count => {
         if(count) {
            res.json({message: "post successfully deleted"});
         } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
         }
      })
      .catch(err => {
         res.status(500).json({ error: "The post could not be removed" })
      });
});

//put request
server.put("/api/posts/:id", (req, res) => {
   const {id} = req.params;
   const post = req.body;

   if(post.title && post.contents) {
      db.update(id, post)
         .then(count => {
            if(count) {
               db.findById(id)
                  .then(post => {
                     res.json(post);
                  })
            } else {
               res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
         })
         .catch(err => {
            res.status(500).json({ error: "The post information could not be modified." })
         });
   } else {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
   }
});

server.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
});