// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here
server.use(express.json());

server.get('/', (req, res) => {
    res.send('We are in the root!');
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.error('error', error);

            res.status(500).json({
                message: 'Error retrieving the data'
            })
        })
})

server.post('api/posts', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400);
        res.json({
            message: 'Please provide title and contents for the post'
        });
    } else {
        const {title, contents} = req.body;
        db.insert({title, contents})
            .then (res => {
                res.status(201);
                db.findById(res.id)
                    .then(posts => {
                        res.json({posts});
                    });
            })
            .catch(error => {
                res.status(500);
                res.json({
                    error: 'There was an error saving the post to the database!'
                })
            })
    }
})

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(success => {
            if(success) {
                res.status(200);
                res.json({success});
            } else {
                res.status(404);
                res.json({
                    message: 'The post with the specified ID does not exist!'
                })
            }
        })
        .catch(error => {
            res.status(500);
            res.json({
                error: 'The post could not be removed!'
            });
        })
})



server.listen(5000, () => 
    console.log('\n==listening API at port 5000 ==\n')
);