// import your node modules
const express = require('express');

const db = require('./data/db.js')

const server = express();

server.use(express.json());
 
server.get('/', (req, res) => {
    res.send('Hello FSW12');
});

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.error('error', err);

            res.status(500).json({ error: "The posts information could not be retrieved." })
        });
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(parseInt(req.params.id))
        .then(posts => {
            console.log(posts, req.params.id);
            if(post.length > 0) {
                res.status(200).json(posts);
            }else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err => {
            console.error('error', err);

            res.status(404).json({ message: "The post with the specified ID does not exist." })
        });
});
 
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));
