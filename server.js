// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const port = 5555;
const server = express();
server.use(express.json());
// server.use(cors({origin: 'http://localhost:3000'}));  Use for react app later
server.get('/', (req, res) => {
    res.send('Whaddup from express');
})


server.post('/api/posts', (req,res) => {
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400);
        res.json({ message: "Please provide title and contents for the post."});
        return;
    }


    db
        .insert({
            title,
            contents
        })
        .then(response => {
            res.status(201);
            res.json(response);
        })
        .catch(error => {
            console.log(error);
            res.status(500);
            res.json({error: "There was an error while saving the post to the database"});
            return;
        });
    });

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json({ posts })
    })
    .catch(error => {
        res.status(500);
        res.json({ error: "The posts information could not be retrieved"});
        return;
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db 
    .findById(id)
        .then(user => {
            if (user.length === 0) {
                res.status(404);
                res.json({message: "The post with the specified ID does not exist"});
                return;
            }
            res.json(user);
        })
        .catch(error => {
            res.status(500);
            res.json({ error: "The post information could not be retrieved"});
        })
});


server.delete('/api/posts/:id')




server.listen(port, () => console.log(`Server running on port ${port}`));