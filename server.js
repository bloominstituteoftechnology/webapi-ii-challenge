const express = require('express');
const db = require('./data/db.js');


const server = express();
server.use(express.json());



server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));


//Home
server.get('/', (req, res) => {
    res.send('This is the homepage');
});

//when client uses .post --> db.insert --------------------------------------------------------------------
server.post("/api/posts", (req, res) => {
    const newPost = req.body;
    if (!newPost.title || !newPost.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    }
    db
      .insert(newPost)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({
          error: "There was an error while saving the post to the database"
        });
      });
  });

//when client uses .get --> db.find -----------------------------------------------------------------------
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve post information'});
        process.abort();
    })
})

//when client uses .get --> db.findbyid ----------------------------------------------------------------------
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
    .findById(id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.json(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post information could not be found'});
        process.abort();
    });
});

//when client uses .delete --> db.remove ------------------------------------------------------------------------------------------
server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    let post;
    db
        .findById(id)
        .then(foundpost => {
            post = { ...foundpost[0] };
            })
        db.remove(id).then (response => {
        if (id === 'undefined') {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post could not be removed.'});
        process.abort();
        })
})

//when client uses .put --> db.update ------------------------------------------------------------
server.put('/api/posts/:id', function(req, res) {
    const { id } = req.params;
    const update = req.body;
//below 200 is the default status you don't need to write it
// if count = 0 then it doesn't fail, it just doesn't find the correct ID
if (!update.title || !update.contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
    db.update(id, update)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ msg: 'updated successfully' })
        } else {
            res.status(404).json({ msg: 'post not found'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


//below is code from node-express-mini
//---------------------------------------------------------------------------------
// const express = require('express');

// const db = require('./data/db');

// const server = express();

// server.use(express.json());

// server.get('/', (req, res) => {
//     res.send('Api Running');
// });


// //route handlers
// // get all data
// server.get('/api/users', (req, res) => {
//     //get the users
//     //.then should return an array of all of the users (see github repo)
//     db.find().then(users => {
//         res.json(users);
//     }).catch(err => {
//         res.status(500).json({ error: err });
//     });//do something with the error}) //the bros

//     //return the users
// });

// // /api/users/2
// server.get('/api/users/:id', (req, res) => {
//     const id = req.params.id;
//     console.log('params', req.params);
//     db
//     .findById(id)
//     .then(users => {
//         if (users.length === 0) {
//             res.status(404).json({ message: 'user not found'});
//         } else {
//         res.json(user);
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: err });
//     });//do something with the error}) //the bros
// });

// //.post --> insert
// server.post('/api/users', (req, res) => {
//     // const id = req.params.id;
//     db.insert(req.body).then(users => {
//         res.status(201).json(users);
//     })
//     .catch(err => {
//         res.status(500).json({ error: err});
//     })
// })

// //delete
// server.delete('/api/users', function(req, res) {
//     const { id } = req.query;
//     let user;
//     db
//         .findById(id)
//         .then(foundUser => {
//             user = { ...foundUser[0] };
        
//         db.remove(id).then(response => {
//             res.status(200).json(user);
//         });
//         })
//         .catch(err => {
//             res.status(500).json({ erro: err });
//         });
// });

// //update
// server.put('/api/users/:id', function(req, res) {
//     const { id } = req.params;
//     const update = req.body;
// //below 200 is the default status you don't need to write it
// // if count = 0 then it doesn't fail, it just doesn't find the correct ID
//     db.update(id, update)
//     .then(count => {
//         if (count > 0) {
//             res.status(200).json({ msg: 'updated successfully' })
//         } else {
//             res.status(404).json({ msg: 'user not found'});
//         }
//     })
//     .catch(err => {
//         res.status(500).json(err)
//     })
// })

// server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));