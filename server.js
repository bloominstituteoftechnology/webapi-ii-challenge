// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
server.use(express.json());
// const bodyParser = require('body-parser');
// server.use(bodyParser.json());

// let nextId = 10;
// function getNextId() {
//     return nextId++;
// }


server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    console.log("POST TITLE_CONTENTS", title, contents);

    db
    .insert({ title, contents })
    .then(response => {
        res.status(201).json(response);
    })
    .catch(err => {
        if (err.errno === 19) {
            res.status(400, "BAD REQUEST");
        } else {
            res.status(500).json({ errorMessage: "Please provide title and contents for the post." });
        }
    });
});

    
server.get('/', (req, res) => {
    res.send('API Running');
});

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500);
        res.json({error: "The posts information could not be retrieved."})
    })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
      .findById(id)
      .then(posts => {
          if (posts.length == 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
          } else {
          res.json(posts[0]);
          }
      })
      .catch(err => {
          res.status(500);
          res.json({error: "The post information could not be retrieved.", err})
      });
});



server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db
    .findById(id)
    .then(foundId => {
        post = { ...foundId[0] };

        db
        .remove(id)
        .then(response => {
            res.status(200);
            res.json(post);
        });
    })
    .catch(err => {
        if (posts.length == 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            res.status(500).json({error: "The post could not be removed.", err})
        }
    });
})



server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;

        db
        .update(id, { title, contents })
        .then(count => {
            if (count > 0) {
                db
                .findById(id)
                .then(posts => {
                    res.status(200).json(posts[0]);
                });
            } else {
                res.status(404).json({ Message: 'Post Not Found'})
                }
            
        })
        .catch(err => {
            if (posts.length == 0) {
                return res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
            res.status(500).json({error: "The post information could not be modified." })
                return;
            }
        })


            // else if (!title || !contents) {
            //     res.status(400, "BAD REQUESTS");
            //     res.json({ errorMessage: "Please provide title and contents for the post." });
            //     return; 
            // }   
            // else {
            //     posts = posts.filter(p => p.id !== Number(id));
            //     res.send(posts);
            // }
        })



server.listen(5555), () => console.log('API RUNNING ON PORT 5555');
// add your server code starting here
