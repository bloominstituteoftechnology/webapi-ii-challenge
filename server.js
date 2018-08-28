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

server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(count => {
            if(count) {
                res.status(204).end()
            }else {
                res.status(404).json({ message: 'No post with this id was found' })
            }
            
        })

        .catch(err => res.status(500).json(err));
});

server.put('/api/posts/:id', (req, res) => {
    const {title, contents} = req.body;
    db.findById(req.params.id)
        .then((id) => {
            console.log(id)
            if(id.length === 0) {
                res.status(404).json({ message: 'The post with the specified ID does not exist.'})
            } else {
                if(!title ||!contents) {
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })    
                } else{
                   db.update(req.params.id, req.body)
                    .then(posts => {
                        res.status(200).json(posts)
                    })
                    .catch(err => res.status(500).json({ message: 'update failed'}))
                    }; 
                }
            }           
        )        
        .catch(err => res.status(404).json({ message: 'The post with the specified ID does not exist.'}))
});
 
server.listen(9000, () => console.log('\n== API on port 9k ==\n'));
