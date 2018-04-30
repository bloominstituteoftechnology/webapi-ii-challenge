
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));




//.post --> insert --------------------------------------------------------------------
server.post('/api/posts', (req, res) => {
    const ob = req.body;
    
    db
        .insert(ob)
        .then(response => {
            if (typeof req.body.title !== 'undefined' && typeof req.body.contents !== 'undefined') {
                res.status(400).json({ message: 'Please provide title and contents for the post.'})
            }

        else {
            res.status(201).json({ messege: 'Post Successful.' })
        }})
        .catch(err => {
            res.status(500).json({ message: 'here was an error while saving the post to the database'})
        })
})

//.get --> find -----------------------------------------------------------------------
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve post information'});
        process.abort();
    })
})

//.get findbyid ----------------------------------------------------------------------
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

//delete ------------------------------------------------------------------------------------------
server.delete('/api/posts/:id', (req, res) => {
    const id = req.param.id;
    db
    .remove(id)
    .then (post=> {
        if (id === 'undefined') {
            res.status(404).json({ message: 'The post with the specified ID does not exist.'})
        } else {
            res.status(200)
        }
    })
    .catch(err => {
        res.status(500).json({error: 'The post could not be removed.'});
        process.abort();
        })
})


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













// add your server code starting here

// // --------------------------------------->
// const express = require('express');

// const db = require('./data/db');

// const server = express();

// server.get('/', (req, res) => {
//     res.send('Api Running');
// });

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
// server.post('/api/users/post', (req, res) => {
//     const ob = req.body;
//     // const id = req.params.id;
//     db.insert(ob)
// })

// server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));