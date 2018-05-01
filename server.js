// import your node modules
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(bodyParser.json());

server.get('/', (req, res) => {
    res.send('API running');
});

//PART 1 - GET request to /api/posts
server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    //If there's an error in retrieving the post from the database
    .catch(err => {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

// - GET request to /api/posts/:id
server.get('/api/posts/:id', (req, res) => {
    // grab the id from URL parameters
    const id = req.params.id;

    db
    .findById(id)
    .then(posts => {
        if (posts.length === 0) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' });
    } else {
        res.json(posts[0]);
    }
})
    //If there's an error in retrieving the post from the database
    .catch(err => {
    res.status(500).json({ error: 'The posts information could not be retrieved.' });
    });
});

//--------------------------------------------------------------------------------

//PART 2 - POST request to /api/posts
server.post('/api.posts', (req, res) => {
    const{title, contents} = req.body;
    const postNew = {title, contents}
        // console.log(req);
        if (title.length === 0 || contents.length === 0) {
            res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
        } else
        db
        .insert(postNew)
        .then(post => {
            res.status(201).json(post);
        })
        //If there's an error in retrieving the post from the database
        .catch(err => {
            res.status(500).json({ error: 'There was an error while saving the post to the database.'})
        });
});

//---------------------------------------------------------------------------------

//PART 3 - DELETE request to /api/posts/:id
server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    if (!db.findById(id)) {
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    } else
    db.remove(id)
    .then(remove => {
        res.status(201).json(remove);
    })
    //If there's an error in retrieving the post from the database
    .catch(err => {
        res.status(500).json({ error: 'The post could not be removed.' })
    });
});

//---------------------------------------------------------------------------------

//PART 4 - PUT request to /api/posts/:id


//---------------------------------------------------------------------------------
server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
