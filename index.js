// import your node modules
const express = require('express');
const db = require('./data/db.js');

const PORT = '8000';

// add your server code starting here
const server = express();
server.use(express.json())
server.get('/api/posts', (req,res) => {
      db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({
                errorMessage: "posts not found!"
            });
        });
});

server.get('/api/posts/:id', (req, res) => {
     const {id} = req.params;
     db.findById(id)
       .then( post => {
            console.log(post[0])
           if(post.length>0) {
               res.status(200).send(post);
           } else {
               res.status(400)
                  .json({errorMessage: "This doesn't seem to be functional"})
           }
       })
       .catch(error => {
              res.status(500)
                 .json({
                     errorMessage: 'Not working'
                 });
       });
});

server.post('/api/posts', (req,res) => {
      const post = req.body;
    //   console.log(post);
      if(post.title && post.contents) {
           console.log("Before insert:", post)
          db.insert(post)
            .then(postId => {
                 console.log("post from the insert method", postId);
                 db.findById(postId.id).then( post => {
                    res.status(201).send(post);
                 });
            })
            .catch(err => {
                res.status(500)
                   .json({errorMessage: "Failed to add new post.."})
            })
      } else {
          res.status(400).json({errorMessage: "Please provide title and contents for the post."});
      }

});



server.put('/api/posts/:id', (req,res) => {
      const post = req.body;
      const {id} = req.params;
      
      if(post.title && post.contents) {
        // 200 successfully updated.
        console.log(id);
        db.update(id, post)
          .then(count => {
              if(count) {
                console.log(count);
                db.findById(id).then( post => {
                      res.json(post); 
                    });
              } else {
                // 404 invalid ID.
                res.status(404).json({ message: "The post with the specified ID does not exist."});
              }
          })
          .catch( err => {
              // 500 something went wrong -- server side code.
              res.status(500)
                 .json({ error: "The post information could not be modified." });
          });
      
      
      } else {
           // 400 title or contents are missing-- client side.
        //    res.status(400).json({ errorMessage:"Please provide title and contents for the post." });
           res.status(400)
             .json({errorMessage: "Please provide title and contents for the post."});
      }
     
});

server.listen(PORT, () => {
     console.log(`Server is up and is running on ${PORT}`);
});