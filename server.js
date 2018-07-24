// import your node modules

//required imports

const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

//GET POSTS
server.get('/api/posts', (req, res)=> {
    let posts = db.find()
    posts.then(response => {
    res.status(200).json(response);
    })
     .catch(err => {
    console.log(err);
    res.status(500).json({err, error: "The posts information could not be retrieved." });
});
});


server.get('/api/posts/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await db.findById(id)
        if (post.length === 0 || post === undefined) {
         res.status(404).json({ message: "The post with the specified ID does not exist." });
        } 
        res.status(200).json(post);

    } catch (err) {
        console.log(err);
          res.status(500).json({ error: "The post information could not be retrieved." });
      }
    });

server.listen(8000, () => console.log('API running on port 8000'));
