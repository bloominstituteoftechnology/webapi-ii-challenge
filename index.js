// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();
server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
    res.send('Good Morning :)')
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            console.log('\n** posts **', posts);
            res.status(200).json(posts);
        })
        .catch(err => res.status(500).json({ error: 'The posts information could not be retrieved.' }));
});

server.get('/api/posts/:id', (req, res) => {
    db.findById(req.params.id)
        .then(post => {
        if (post.length === 0) {return res.status(404).json({message: "The post with the specified ID does not exist."});
        } else
        console.log(post);
        res.status(200).json(post);
        })
        .catch(err => res.status(500).json({message: 'The post information could not be retrieved.'}));
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db.insert({ title, contents })
      .then(postID => {
        db.findById(postID).then(post => {
          if (!post) {
            return res.status(400).send({ message: `Please provide title and contents for the user.` });
          }
          res.status(201).json(post);
        });
    })
      .catch(() => res.status(500).json({ message: 'There was an error while saving the post to the database.' }));
});

server.delete('/api/posts/:id', (req, res) => {
    const post = db.findById(id);
    db.remove(req.params.id)
      .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: 'The post with the specified ID does not exist.' });
        }
      })
      .catch(() => res.status(500).json({ message: 'The post could not be removed.' }));
  });

  server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents };
    db.update(id, newPost)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => res.status(500).json({ message: "The post information could not be modified." }));
  });



const port = 5000;
    server.listen(port, () => console.log(`\n*** Server listenning on port ${port} ***\n`)
);