// import your node modules
const express = require('express');
const bodyParser = require('body-parser')

const db = require('./data/db.js')

const server = express();

server.use(bodyParser.urlencoded({ extended: false }));

server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('Hello FSW12');
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', error);

            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
            if(post.length > 0) {
                console.log(req.params)
                res.status(200).json(post);
            }else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.error('error', error);

            res.status(500).json({ error: "The post information could not be retrieved." })
        });
});

server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    if(!title ||!contents) {
        console.error('error', error);

        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    db.insert({title, contents})
        .then(() => {
            db.find()
                .then(posts => {
                res.status(201).json(posts);
            })
        })
        .catch(err => {
            console.error('error', error);

            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
});
 
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));
