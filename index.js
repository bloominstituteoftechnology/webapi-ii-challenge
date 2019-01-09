// import your node modules
const express = require('express'); //imports express package
const cors = require('cors');
const db = require('./data/db.js'); //imports database.js

//server code starts here

const server = express(); // creates the server 
server.use(cors());

//wire up global middleware
server.use(express.json()); //teaches expresss how to parse json from the body

server.get('/', (req, res) => {
    res.send('Hawt Diggity Dawg!');
  });

server.get('/api/posts', (req,res) => {
    db.find().then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})
  

server.get('/api/posts/:userid', (req,res) => {
    const id = req.params.userid;

    db.findById(id)
    .then(posts => {
      if (posts.length) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." })
  );
});
server.post("/api/posts", (req, res) => {
    const addNew = req.body;
  
    if (!addNew.title || !addNew.contents) {
      return res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
  
    db.insert(addNew)
      .then(result => {
        db.findById(result.id)
          .then(post => res.status(201).json(post))
          .catch(err =>
            res.status(500).json({
              message: "There was an error while saving the post to the database"
            })
          );
      })
      .catch(err =>
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        })
      );
  });
  
  server.put("/api/posts/:userid", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    db.findById(id)
      .then(post => {
        if (!post) {
          res
            .status(404).json({ message: "The post with the specified ID does not exist." });
        }
        if (!changes.title || !changes.contents) {
          res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
          });
        }
        db.update(id, changes).then(addNew => {
          res.status(200).json(addNew);
        });
      })
      .catch(err =>
        res
          .status(500).json({ error: "The post information could not be modified." })
      );
  });
  
  server.delete("/api/posts/:userid", (req, res) => {
    const { id } = req.params;
  
    db.findById(id)
      .then(post => {
        if (post.length) {
          db.remove(id).then(res.status(200).json(post));
        } else {
          res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
      })
      .catch(err =>
        res.status(500).json({ error: "The post could not be removed" })
      );
  });
  
server.listen(5000, () => console.log('server is running hawt dog'));