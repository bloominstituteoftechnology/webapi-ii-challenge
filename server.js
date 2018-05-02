// import your node modules
const express = require('express');
// const bodyParser = require('body-parser');
const helmet = require('helmet'); //extra security for FREE
const db = require('./data/db.js');
const cors = require('cors');

const server = express();

//add middleware
server.use(helmet());
server.use(express.json());
server.use(cors());
// server.use(bodyParser.json());

// add your server code starting here
//route handlers
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

//PART 2 - POST request to /api.posts
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
server.put('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    const { title, contents } = req.body;
    if (!db.findById(id)) { 
        res.status(404).json({ message: 'The post with the specified ID does not exist.' })
    }
    if (req.body.length === 0) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
    } else
    db.update(id, req.body)
    .then(improve => {
        res.status(200).json(improve);
    })
    //If there's an error in retrieving the post from the database
    .catch(err => {
        res.status(500).json({ error: 'The post information could not be modified.' })
    });
});

//---------------------------------------------------------------------------------

server.listen(5000, () => console.log('\n== API Running on port 5000 ==\n'));
