// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');



// add your server code starting here
const port = 5050;
const server = express();
server.use(express.json());
server.use(cors());

const userError = (status, message, res) => {
    res.status(status).json({ errorMessage: message })
}

server.get('/', (req, res) => {
    res.send('node-express-lab')
});

server.get('/api/posts',(req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts })
        })
        .catch(error => {
            userError(500, 'The posts information could not be retrieved.', res);
        });
});

server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(posts => {
            if (post.length === 0) {
                userError(404, "The post with the specified ID does not exist.", res);
                return;
            }
            res.send(posts);
        })

        .catch(error => {
            userError(500, "The post information could not be retrieved.", res);
        });
});


server.listen(port, () => console.log(`Server running on port ${port}`));