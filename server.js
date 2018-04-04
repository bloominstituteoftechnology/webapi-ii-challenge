const express = require('express');
const server = express();
const cors = require("cors");

server.use(express.json());
server.use(cors());

const db = require('./data/db.js');


// server.get('/', (req, res) => {
//     res.send({ api: 'Running...' })
// });


server.post('/api/posts', (req, res) => {
	const post = req.body;

	if (post.title && post.contents) {
	  db
	    .insert(post)
	    .then(created => {
	      res.status(201).json({ post });
	    })
	    .catch(error => {
	     res.status(500).json({ error: "The posts information could not be retrieved."});
	    })
	 } else {
	     res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
	 }
});


server.get('/api/posts', (req, res) => {

    db
    .find()
    .then(posts => {
     res.json(posts);
    })
    .catch(error => {
     res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .findById(id)
    .then(posts => {
	    if (posts.length) {
	      res.status(200).send(posts[0])
	    } else {
	      res.status(404).json({ message: "The post with the specified ID does not exist." });
	    }
	})
    .catch(error => {
     res.status(500).json({ error: "The post information could not be retrieved." });
    });
});


server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(posts => {
        if (posts.length < 1) {
            return res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        let post = posts[0]
        db.remove(id).then(() => {
            res.status(200).json(post)
        }).catch(error => {
            res.status(500).json({ error: "The post information could not be removed" });
        })
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be found" });
    })
});


server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const post = { title, contents };

    if (!title || !contents) return res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    db
        .update(id, post)
        .then(posts => {
            if (posts.length < 1) return res.status(404).json({ message: "The post with the specified ID does not exist." });
            res.status(200).json({ title, contents, id });
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." });
        });
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
