const express = require('express');
const db = require('./data/db.js');

const port = 5555;
const server = express();
server.use(express.json())

// add your server code starting here


server.get('/', (req, res) => {
    res.send('Howdy howdy howdy!');
});

server.get('/posts', (req, res) => {
    db
        .find()
        .then(response => {
            res.json({ posts });
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "The posts information could not be retrieved." })
        });
});

server.post('/posts', (req, res) => {
    const { title, contents } = req.body;
    if(!title || !contents) {
        res.status(400)
        res.json({ error: "Please provide title and contents for the post." })
    }
    db
        .insert({
            title,
            contents,
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500)
            res.json({ error: "There was an error while saving the post to the database" })
        });
});

server.get('/posts/:id', (req, res) => {
        const { id } = req.params;
        db  
            .findById(id)
            .then(post => {
                if(post === 0) {
                    res.status(404)
                    res.json({ error: "The post with the specified ID does not exist." })
                }
                res.json({post});
            })
            .catch(error => {
                res.status(500)
                res.json({ error: "The post information could not be retrieved." })
            });
    });
    
server.delete('/posts/:id', (req, res) => {
        const { id } = req.params;
        db  
            .remove(id)
            .then(post => {
                if(post === 0) {
                    res.status(404)
                    res.json({ error: "The post with the specified ID does not exist." })
                }
            })
            .catch(error => {
                res.status(500)
                res.json({ error: "The post could not be removed" })
            });
    });
    
// server.put('/posts/:id', (req, res) => {
//     const { id } = req.params.id;
//     const { title, contents } = req.body;
//     if(!title || !contents) {
//         res.status(400)
//         res.json({ error: "Please provide title and contents for the post."})
//     }
// db
// .update(id, { title, contents })
// .then(response => {
//     if(response == 0) {
//     res.status(404)
//     res.json({ error: "The post with the specified ID does not exist." })   
// }
//     res.json({ post });
// }
// db
// .findById(id)
// .then(post => {
//     if(post.length === 0) {
//         res.status(404)
//         res.json({ error: "The post with the specified ID does not exist." })
//     }
//     res.json({ post });
// })
// .catch(error => {
//     res.status(500)
//     .send({ error: "update: the post information could not be modified." })
// });
// });


server.listen(port, () => console.log('API running...'));